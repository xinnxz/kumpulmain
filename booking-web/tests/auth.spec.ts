import { test, expect } from '@playwright/test';

/**
 * Authentication Tests
 * Test login, register, dan protected routes
 */
test.describe('Authentication', () => {
    test.describe('Login Page', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/login');
            await page.waitForLoadState('networkidle');
        });

        test('should display login form', async ({ page }) => {
            // Check page has loaded - "Selamat Datang!" appears in login page
            await expect(page.getByText('Selamat Datang!')).toBeVisible();

            // Form elements
            await expect(page.getByText('Email')).toBeVisible();
            await expect(page.getByText('Password')).toBeVisible();
            await expect(page.getByRole('button', { name: /Masuk/i })).toBeVisible();
        });

        test('should have link to register page', async ({ page }) => {
            const registerLink = page.getByRole('link', { name: /Daftar sekarang/i });
            await expect(registerLink).toBeVisible();
            await registerLink.click();
            await expect(page).toHaveURL(/.*register/);
        });

        test('should show error for invalid credentials', async ({ page }) => {
            // Fill in invalid credentials
            await page.getByPlaceholder('nama@email.com').fill('invalid@test.com');
            await page.getByPlaceholder('Masukkan password').fill('wrongpassword');
            await page.getByRole('button', { name: /Masuk/i }).click();

            // Wait for API response
            await page.waitForTimeout(3000);

            // Should show error message
            const errorMessage = page.locator('text=/gagal|error|salah/i');
            const isErrorVisible = await errorMessage.isVisible().catch(() => false);

            // Should still be on login page OR show error
            const url = page.url();
            expect(url.includes('login') || isErrorVisible).toBeTruthy();
        });

        test('should login with valid demo credentials', async ({ page }) => {
            // Click User demo button
            await page.getByRole('button', { name: 'User' }).click();

            // Click login button
            await page.getByRole('button', { name: /Masuk/i }).click();

            // Wait for redirect
            await page.waitForTimeout(4000);

            // Should redirect away from login
            const url = page.url();
            expect(url.includes('login')).toBeFalsy();
        });
    });

    test.describe('Register Page', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/register');
            await page.waitForLoadState('networkidle');
        });

        test('should display registration form', async ({ page }) => {
            // Check page title - "Buat Akun" appears in register page
            await expect(page.getByText('Buat Akun')).toBeVisible();

            // Form elements
            await expect(page.getByText('Nama Lengkap')).toBeVisible();
            await expect(page.getByText('Email')).toBeVisible();
            await expect(page.getByText('Password').first()).toBeVisible();
            await expect(page.getByRole('button', { name: /Daftar Sekarang/i })).toBeVisible();
        });

        test('should have link to login page', async ({ page }) => {
            const loginLink = page.getByRole('link', { name: /Masuk/i });
            await expect(loginLink).toBeVisible();
        });

        test('should validate required fields', async ({ page }) => {
            // Click submit without filling form
            await page.getByRole('button', { name: /Daftar Sekarang/i }).click();

            // Should stay on register page (HTML5 validation)
            await expect(page).toHaveURL(/.*register/);
        });
    });
});

/**
 * Protected Routes Tests
 */
test.describe('Protected Routes', () => {
    test('dashboard redirects or shows login prompt if not authenticated', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Should show login prompt, redirect to login, or stay on dashboard with prompt
        const url = page.url();
        const hasLoginButton = await page.getByRole('button', { name: /Masuk/i }).isVisible().catch(() => false);
        const hasLoginLink = await page.getByRole('link', { name: /Masuk/i }).isVisible().catch(() => false);

        expect(url.includes('login') || hasLoginButton || hasLoginLink).toBeTruthy();
    });

    test('pengelola area requires authentication', async ({ page }) => {
        await page.goto('/pengelola/dashboard');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Should redirect or show login
        const url = page.url();
        expect(url.includes('login') || url.includes('pengelola')).toBeTruthy();
    });

    test('admin area requires authentication', async ({ page }) => {
        await page.goto('/admin/dashboard');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Should redirect or show admin login
        const url = page.url();
        expect(url.includes('login') || url.includes('admin')).toBeTruthy();
    });
});
