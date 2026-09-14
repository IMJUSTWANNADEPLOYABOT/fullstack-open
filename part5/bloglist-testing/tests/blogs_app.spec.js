const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Andrey',
                username: 'admiral',
                password: 'qwerty'
            }
        })
        await page.goto('/')
    })



    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    test('user can login', async ({ page }) => {
        await loginWith(page, 'admiral', 'qwerty')
        await expect(page.getByText('Andrey logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'admiral', 'wrong')
        await expect(page.getByText('Andrey logged in')).not.toBeVisible()
    })


    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'admiral', 'qwerty')
        })
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Amazing blog post', 'Playwright', 'https://playwright.com')
            await expect(page.getByText('Amazing blog post – by Playwright')).toBeVisible()
        })

        test('a blog post can be liked', async ({ page }) => {
            const title = 'Another text – by playwright'
            await createBlog(page, title, 'Playwright', 'https://playwright.com')

            const blogElement = page.locator('.blog').filter({ hasText: title })
            await blogElement.getByRole('button', { name: 'show' }).click()
            await blogElement.getByRole('button', { name: 'like' }).click()

            await expect(blogElement.getByText('likes 1')).toBeVisible()
        })

        test('a blog post can be deleted', async ({ page }) => {
            const title = 'Blog to delete'
            const author = 'playwright'
            const fullText = `${title} – by ${author}`

            await createBlog(page, title, author, 'https://playwright.com')

            const blogElement = page.locator('.blog').filter({ hasText: title })
            await blogElement.getByRole('button', { name: 'show' }).click()

            page.on('dialog', async dialog => {
                await dialog.accept()
            })

            await blogElement.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText(fullText)).not.toBeVisible()
        })

        test('only author sees button delete', async ({ page, request }) => {
            await createBlog(page, 'Blog to delete', 'Playwright', 'https://playwright.com')
            const blogElement = page.locator('.blog').filter({ hasText: 'Blog to delete' })
            await blogElement.getByRole('button', { name: 'show' }).click()
            await expect(blogElement.getByRole('button', { name: 'remove' })).toBeVisible()
            await page.getByRole('button', { name: 'Logout' }).click()
            await request.post('/api/users', {
                data: {
                    name: 'Sergey',
                    username: 'superdev',
                    password: '1234'
                }
            })
            await loginWith(page, 'superdev', '1234')
            await blogElement.getByRole('button', { name: 'show' }).click()
            await expect(blogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
        test('blogs are sorted correctly', async ({ page }) => {
            await createBlog(page, 'First', 'Author A', 'http...')
            const firstBlog = page.locator('.blog').filter({ hasText: 'First' })
            await firstBlog.getByRole('button', { name: 'show' }).click()
            await firstBlog.getByRole('button', { name: 'like' }).click()
            await expect(firstBlog.getByText('likes 1')).toBeVisible()
            await firstBlog.getByRole('button', { name: 'like' }).click()
            await expect(firstBlog.getByText('likes 2')).toBeVisible()
            await firstBlog.getByRole('button', { name: 'like' }).click()
            await expect(firstBlog.getByText('likes 3')).toBeVisible()
            await firstBlog.getByRole('button', { name: 'hide' }).click()

            await createBlog(page, 'Second', 'Author B', 'http...')
            const secondBlog = page.locator('.blog').filter({ hasText: 'Second' })
            await expect(secondBlog.getByText('Second')).toBeVisible()

            await secondBlog.getByRole('button', { name: 'show' }).click()
            await expect(secondBlog.getByText('likes 0')).toBeVisible()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 1')).toBeVisible()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 2')).toBeVisible()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 3')).toBeVisible()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await expect(secondBlog.getByText('likes 4')).toBeVisible()
            const blogLocators = page.locator('.blog')
            await expect(blogLocators.first()).toContainText('Second')
            

        })
    })

})