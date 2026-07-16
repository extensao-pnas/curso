import { test, expect } from '@playwright/test';

test.describe('Landing Page — Curso de Extensão SUAS 2026', () => {

  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Curso de Extensão 2026/);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#hero-heading');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText('Assistentes Sociais');
  });

  test('CTA button links to about section', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('a[href="#sobre"]');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    // After clicking, the about section should be in view
    const aboutSection = page.locator('#sobre');
    await expect(aboutSection).toBeVisible();
  });

  test('schedule accordion opens module 1 by default', async ({ page }) => {
    await page.goto('/');
    // Wait for React hydration (client:idle)
    await page.waitForSelector('[id^="module-content-"]', { state: 'visible' });
    // Module 1 should be expanded (has aria-expanded="true")
    const module1Button = page.locator('[aria-expanded="true"]').first();
    await expect(module1Button).toBeVisible();
  });

  test('schedule accordion toggles modules', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[aria-expanded]', { state: 'visible' });
    // Find module 2 button (aria-expanded="false" initially) and click it
    const module2Button = page.locator('[aria-controls="module-content-2"]');
    await expect(module2Button).toHaveAttribute('aria-expanded', 'false');
    await module2Button.click();
    await expect(module2Button).toHaveAttribute('aria-expanded', 'true');
  });

  test('registration timeline shows 3 steps', async ({ page }) => {
    await page.goto('/');
    // Each step has a rounded-full circle with a step number
    const steps = page.locator('section[aria-labelledby="registration-timeline-heading"] div[class*="rounded-full"]');
    await expect(steps).toHaveCount(3);
  });

  test('footer shows partner logos', async ({ page }) => {
    await page.goto('/');
    const logos = page.locator('footer img');
    const count = await logos.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      await expect(logos.nth(i)).toBeVisible();
    }
  });

  test('404 page works', async ({ page }) => {
    const response = await page.goto('/pagina-inexistente');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('não encontrada');
    // Back to home link exists
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    // sr-only: visually hidden but must be in the DOM
    await expect(skipLink).toBeAttached();
  });

  test('JSON-LD structured data is present', async ({ page }) => {
    await page.goto('/');
    // <script> tags are not visible, but must be in the DOM
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.innerText();
    const parsed = JSON.parse(content);
    expect(parsed['@type']).toBe('Course');
  });

});
