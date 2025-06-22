const { test, expect } = require('@playwright/test');

test('application loads correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Your Application Title/);
});