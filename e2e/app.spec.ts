import { test, expect } from '@playwright/test'

test.describe('User Management App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the initial load button', async ({ page }) => {
    await expect(page.getByText('불러오기')).toBeVisible()
  })

  test('should load and display users', async ({ page }) => {
    // Click the load button
    await page.getByText('불러오기').click()

    // Wait for users to load
    await expect(page.getByText(/Bret|Antonette|Samantha/)).toBeVisible({ timeout: 10000 })

    // Check that the reload button appears
    await expect(page.getByText('다시 불러오기')).toBeVisible()
  })

  test('should display user details when clicking on a user', async ({ page }) => {
    // Load users
    await page.getByText('불러오기').click()

    // Wait for users to load
    await page.waitForSelector('li', { timeout: 10000 })

    // Click on the first user
    await page.locator('li').first().click()

    // Wait for user details to load
    await expect(page.locator('h2')).toBeVisible({ timeout: 10000 })

    // Check that email is displayed
    await expect(page.getByText(/Email:/)).toBeVisible()
  })

  test('should reload users when clicking reload button', async ({ page }) => {
    // Initial load
    await page.getByText('불러오기').click()
    await page.waitForSelector('li', { timeout: 10000 })

    // Count initial users
    const initialUserCount = await page.locator('li').count()
    expect(initialUserCount).toBeGreaterThan(0)

    // Click reload
    await page.getByText('다시 불러오기').click()

    // Wait for loading to complete
    await page.waitForTimeout(1000)

    // Users should still be present
    const reloadedUserCount = await page.locator('li').count()
    expect(reloadedUserCount).toBe(initialUserCount)
  })

  test('should handle navigation between different users', async ({ page }) => {
    // Load users
    await page.getByText('불러오기').click()
    await page.waitForSelector('li', { timeout: 10000 })

    // Click on the first user
    await page.locator('li').first().click()
    const firstUserName = await page.locator('h2').textContent()

    // Click on the second user
    await page.locator('li').nth(1).click()
    const secondUserName = await page.locator('h2').textContent()

    // User names should be different
    expect(firstUserName).not.toBe(secondUserName)
  })
})
