"""Render versao_e.html to a 1080×1080 PNG using Playwright."""
import asyncio
import os
from playwright.async_api import async_playwright

BASE_DIR = os.path.dirname(__file__)


async def main():
    html_path = f"file://{os.path.join(BASE_DIR, 'versao_e.html')}"
    output_path = os.path.join(BASE_DIR, "arte_versao_e_reduzida.png")

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": 1400, "height": 2000},
            device_scale_factor=4,
        )

        await page.goto(html_path, wait_until="networkidle")
        await page.wait_for_timeout(2500)

        art = await page.query_selector("#art")
        if art:
            box = await art.bounding_box()
            if box:
                await page.screenshot(
                    path=output_path,
                    clip={
                        "x": box["x"],
                        "y": box["y"],
                        "width": box["width"],
                        "height": box["height"],
                    },
                )
                size_kb = os.path.getsize(output_path) / 1024
                print(f"✅ arte_versao_e_reduzida.png — {box['width']:.0f}×{box['height']:.0f} "
                      f"(4x: {box['width']*4:.0f}×{box['height']*4:.0f}) — {size_kb:.0f} KB")
        else:
            await page.screenshot(path=output_path)
            print("⚠️  #art not found, full page screenshot")

        await browser.close()
    print("\n✨ Versão E exported!")


if __name__ == "__main__":
    asyncio.run(main())
