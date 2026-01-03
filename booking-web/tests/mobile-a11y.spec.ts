import { test, expect } from '@playwright/test';

/**
 * Mobile Responsiveness Tests
 * Test tampilan di viewport mobile
 */
test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

    test('homepage should be responsive', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Page should load
        await expect(page).toHaveTitle(/KumpulMain/);

        // Content should be visible
        const content = page.locator('main, body');
        await expect(content.first()).toBeVisible();
    });

    test('venues page should be responsive', async ({ page }) => {
        await page.goto('/venues');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Page should load
        await expect(page.getByText(/Lapangan|Venue/i).first()).toBeVisible();
    });

    test('login page should be responsive', async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('networkidle');

        // Login form should be visible on mobile
        await expect(page.getByText('Selamat Datang!')).toBeVisible();
        await expect(page.getByRole('button', { name: /Masuk/i })).toBeVisible();
    });
});

/**
 * Accessibility Tests
 */
test.describe('Accessibility', () => {
    test('homepage should have proper heading structure', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Should have at least one h1
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test('pages should have navigation', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Navigation should exist
        await expect(page.locator('nav')).toBeVisible();
    });

    test('forms should have labels', async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('networkidle');

        // Check that labels exist for form fields
        const labels = await page.locator('label').count();
        expect(labels).toBeGreaterThan(0);
    });

    test('images should have alt text', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check first few images have alt attribute
        const images = page.locator('img');
        const count = await images.count();

        if (count > 0) {
            const firstImg = images.first();
            const alt = await firstImg.getAttribute('alt');
            expect(alt).not.toBeNull();
        }
    });
});

/**
 * Performance Tests
 */
test.describe('Performance', () => {
    test('homepage should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        const loadTime = Date.now() - startTime;

        // Should load within 10 seconds
        expect(loadTime).toBeLessThan(10000);
    });

    test('venues page should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/venues');
        await page.waitForLoadState('domcontentloaded');
        const loadTime = Date.now() - startTime;

        // Should load within 10 seconds
        expect(loadTime).toBeLessThan(10000);
    });
});
