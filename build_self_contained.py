#!/usr/bin/env python3
"""Build self-contained HTML from Astro dist/ output."""

import re
import base64
import os

BASE = "/home/predator/projects/arte_projeto_extensao"

# ── 1. Read files ──────────────────────────────────────────────
with open(f"{BASE}/dist/index.html", "r") as f:
    html = f.read()

css_file = os.path.basename(
    [f for f in os.listdir(f"{BASE}/dist/_astro") if f.startswith("index.") and f.endswith(".css")][0]
)
with open(f"{BASE}/dist/_astro/{css_file}", "r") as f:
    css = f.read()

# ── 2. Base64 encode images ──────────────────────────────────
def b64(filepath):
    with open(filepath, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")

img1_b64 = b64(f"{BASE}/dist/assets/image1.png")
img2_b64 = b64(f"{BASE}/dist/assets/image2.png")
img3_b64 = b64(f"{BASE}/dist/assets/image3.png")
img4_b64 = b64(f"{BASE}/dist/assets/image4.png")
favicon_svg_raw = open(f"{BASE}/dist/favicon.svg", "r").read()
favicon_b64 = base64.b64encode(favicon_svg_raw.encode("utf-8")).decode("ascii")

# ── 3. Process CSS ────────────────────────────────────────────
# Remove @font-face declarations for Inter and Merriweather
css = re.sub(
    r'@font-face\{[^}]*?font-family:(Inter|Merriweather)[^}]*?\}',
    '',
    css
)

# Replace --font-sans with system font stack
css = css.replace('--font-sans:"Inter", sans-serif', '--font-sans:system-ui, -apple-system, "Segoe UI", Roboto, sans-serif')
css = css.replace('--font-heading:"Merriweather", serif', '--font-heading:Georgia, "Times New Roman", serif')

# Clean up any double-semicolons from font-face removal
css = re.sub(r';;+', ';', css)

# Remove astro-island display:contents style (part of CSS that gets inlined)
css = re.sub(r'astro-island,astro-slot,astro-static-slot\{display:contents\}', '', css)

# Remove [data-astro-transition-scope] animation:none rule from CSS
css = re.sub(r'\[data-astro-transition-scope\]\{animation:none!important\}', '', css)

# ── 4. Process HTML ───────────────────────────────────────────
# 4a. Inline CSS: replace <link rel="stylesheet"> with <style>
html = re.sub(
    r'<link\s+rel="stylesheet"\s+href="/_astro/[^"]*\.css"\s*/?>',
    f'<style>{css}</style>',
    html
)

# 4a2. Remove astro-island display:contents <style> block from HTML
html = re.sub(
    r'<style>astro-island,astro-slot,astro-static-slot\{display:contents\}</style>',
    '',
    html
)

# 4b. Remove ClientRouter script
html = re.sub(
    r'<script\s+type="module"\s+src="/_astro/ClientRouter[^"]*"[^>]*>\s*</script>',
    '',
    html
)

# 4c. Remove page.js script
html = re.sub(
    r'<script\s+type="module"\s+src="/_astro/page\.[^"]*"[^>]*>\s*</script>',
    '',
    html
)

# 4d. Remove manifest link
html = re.sub(
    r'<link\s+rel="manifest"\s+href="/manifest\.json"[^>]*>',
    '',
    html
)

# 4e. Remove astro view transitions <style> block
html = re.sub(
    r'<style>\[data-astro-transition-scope=.*?</style>',
    '',
    html,
    flags=re.DOTALL
)

# 4f. Remove data-astro-transition-scope attribute from <main>
html = re.sub(
    r'\s+data-astro-transition-scope="[^"]*"',
    '',
    html
)

# 4g. Remove astro view transitions meta tags
html = re.sub(
    r'<meta\s+name="astro-view-transitions-enabled"\s+content="[^"]*"\s*/?>',
    '',
    html
)
html = re.sub(
    r'<meta\s+name="astro-view-transitions-fallback"\s+content="[^"]*"\s*/?>',
    '',
    html
)

# 4h. Remove service worker script (if any)
html = re.sub(
    r'<script[^>]*service-worker[^>]*>.*?</script>',
    '',
    html,
    flags=re.DOTALL
)

# 4i. Remove astro-island wrappers but keep inner content
# <astro-island ...>CONTENT</astro-island> → CONTENT
html = re.sub(
    r'<astro-island[^>]*>(.*?)</astro-island>',
    r'\1',
    html,
    flags=re.DOTALL
)

# 4j. Remove astro idle polyfill / island definition scripts
# Remove script whose body contains astro-island (hydration/custom element def)
def remove_astro_scripts(html_text):
    """Find and remove <script> tags that contain 'astro-island' in their body."""
    result = []
    pos = 0
    while True:
        start = html_text.find('<script', pos)
        if start == -1:
            result.append(html_text[pos:])
            break
        end = html_text.find('</script>', start)
        if end == -1:
            result.append(html_text[pos:])
            break
        end += len('</script>')
        body = html_text[start:end]
        if 'astro-island' in body or 'astro:idle' in body or 'idle-polyfill' in body:
            result.append(html_text[pos:start])
        else:
            result.append(html_text[pos:end])
        pos = end
    return ''.join(result)

html = remove_astro_scripts(html)

# 4k. Add data-accordion-btn to each button with aria-expanded
html = re.sub(
    r'(<button\s)([^>]*?\baria-expanded="[^"]*")',
    r'\1data-accordion-btn \2',
    html
)

# 4l. Add data-chevron to each SVG inside accordion buttons
# Match <svg...> inside <button data-accordion-btn...>
def add_data_chevron(match):
    button_content = match.group(0)
    # Find the first <svg> in the button and add data-chevron before >
    return re.sub(
        r'(<svg\b)',
        r'\1 data-chevron',
        button_content,
        count=1
    )

html = re.sub(
    r'<button\s+data-accordion-btn\b[^>]*>.*?</button>',
    add_data_chevron,
    html,
    flags=re.DOTALL
)

# 4m. Replace image src with base64 data URIs
html = html.replace('src="/assets/image1.png"', f'src="data:image/png;base64,{img1_b64}"')
html = html.replace('src="/assets/image2.png"', f'src="data:image/png;base64,{img2_b64}"')
html = html.replace('src="/assets/image3.png"', f'src="data:image/png;base64,{img3_b64}"')
html = html.replace('src="/assets/image4.png"', f'src="data:image/png;base64,{img4_b64}"')

# 4n. Replace favicon link with inline SVG
favicon_svg_escaped = favicon_svg_raw.replace('"', '\\"').replace('\n', '')
favicon_data_uri = f'data:image/svg+xml;utf8,{favicon_svg_escaped}'
html = re.sub(
    r'<link\s+rel="icon"[^>]*href="/favicon\.svg"[^>]*>',
    f'<link rel="icon" type="image/svg+xml" href="{favicon_data_uri}">',
    html
)

# 4o. Replace og:image with inline data URI for favicon
html = re.sub(
    r'<meta\s+property="og:image"\s+content="[^"]*favicon\.svg"[^>]*>',
    f'<meta property="og:image" content="{favicon_data_uri}">',
    html
)

# 4p. Replace twitter:image with inline data URI
html = re.sub(
    r'<meta\s+name="twitter:image"\s+content="[^"]*favicon\.svg"[^>]*>',
    f'<meta name="twitter:image" content="{favicon_data_uri}">',
    html
)

# 4q. Add vanilla JS accordion before </body>
accordion_js = """
<script>
document.querySelectorAll('[data-accordion-btn]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    var content = document.getElementById(btn.getAttribute('aria-controls'));
    if (content) {
      if (expanded) { content.style.maxHeight = '0'; content.style.opacity = '0'; content.style.overflow = 'hidden'; }
      else { content.style.maxHeight = content.scrollHeight + 'px'; content.style.opacity = '1'; content.style.overflow = 'visible'; }
    }
    var chevron = btn.querySelector('[data-chevron]');
    if (chevron) chevron.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
  });
});
</script>
</body>"""

html = html.replace('</body>', accordion_js)

# ── 5. Write output ────────────────────────────────────────────
with open(f"{BASE}/versao_self_contained.html", "w") as f:
    f.write(html)

print(f"CSS file used: {css_file}")
print(f"Output written to versao_self_contained.html")
print(f"HTML size: {len(html)} chars")
