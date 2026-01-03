import { test, expect } from '@playwright/test';

/**
 * Homepage Tests
 * Test halaman utama dan navigasi dasar
 */
test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('should load homepage with hero section', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/KumpulMain/);

        // Hero section - check for main heading text
        const heroText = page.getByText(/Booking|Lapangan|Main Bareng/i).first();
        await expect(heroText).toBeVisible({ timeout: 10000 });

        // Navigation should be visible
        await expect(page.getByRole('navigation')).toBeVisible();
    });

    test('should have working navigation links', async ({ page }) => {
        // Check main nav links exist
        const links = await page.locator('nav a').count();
        expect(links).toBeGreaterThan(0);
    });

    test('should navigate to venues page', async ({ page }) => {
        // Find and click venues link
        const venueLink = page.locator('a[href*="venues"]').first();
        await venueLink.click();
        await expect(page).toHaveURL(/.*venues/);
    });

    test('should navigate to joinan page', async ({ page }) => {
        // Find and click joinan link
        const joinanLink = page.locator('a[href*="joinan"]').first();
        await joinanLink.click();
        await expect(page).toHaveURL(/.*joinan/);
    });

    test('should show footer', async ({ page }) => {
        // Scroll to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        // Footer should be visible
        await expect(page.locator('footer')).toBeVisible();
    });
});
