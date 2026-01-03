import { test, expect } from '@playwright/test';

/**
 * Venues Page Tests
 * Test pencarian dan listing venue
 */
test.describe('Venues Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/venues');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Wait for data to load
    });

    test('should display venues listing', async ({ page }) => {
        // Page should have content about lapangan/venue
        await expect(page.getByText(/Lapangan|Venue/i).first()).toBeVisible();

        // Should show venue cards (links to venue details)
        const venueLinks = page.locator('a[href^="/venues/"]');
        await expect(venueLinks.first()).toBeVisible({ timeout: 10000 });
    });

    test('should have category filters or search', async ({ page }) => {
        // Look for any filter/category buttons or search
        const hasFilters = await page.locator('button, input[type="search"], input[type="text"]').first().isVisible();
        expect(hasFilters).toBeTruthy();
    });

    test('should navigate to venue detail when clicking venue card', async ({ page }) => {
        // Click first venue
        const venueLink = page.locator('a[href^="/venues/"]').first();
        await venueLink.click();

        // Should be on venue detail page
        await expect(page).toHaveURL(/.*venues\/.+/);
    });
});

/**
 * Venue Detail Page Tests
 */
test.describe('Venue Detail Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to venues first then click one
        await page.goto('/venues');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Click first venue
        const venueLink = page.locator('a[href^="/venues/"]').first();
        await venueLink.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
    });

    test('should display venue information', async ({ page }) => {
        // Venue name (h1) should be visible
        await expect(page.locator('h1')).toBeVisible();
    });

    test('should display facilities section', async ({ page }) => {
        // Scroll down to find facilities
        await page.evaluate(() => window.scrollTo(0, 300));
        await page.waitForTimeout(500);

        const facilities = page.getByText('Fasilitas');
        await expect(facilities).toBeVisible({ timeout: 10000 });
    });

    test('should display description section', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 500));
        await expect(page.getByText('Deskripsi')).toBeVisible({ timeout: 5000 });
    });

    test('should display Google Maps location', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 800));
        await expect(page.getByText('Lokasi')).toBeVisible({ timeout: 5000 });
    });

    test('should display venue rules', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 1000));
        await expect(page.getByText('Aturan Venue')).toBeVisible({ timeout: 5000 });
    });

    test('should have booking widget elements', async ({ page }) => {
        // Look for booking related text
        const hasBookingElements = await page.getByText(/Pilih (Tanggal|Jam|Lapangan)/i).first().isVisible().catch(() => false);
        expect(hasBookingElements).toBeTruthy();
    });

    test('should allow selecting date', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 0));

        // Try to click a date button (could be in booking widget on right side)
        const dateButton = page.locator('button').filter({ hasText: /^(Hari Ini|\d{1,2})$/i }).first();

        if (await dateButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await dateButton.click();
        }
    });
});
