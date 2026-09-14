import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but does not render url and likes by default', () => {
    const blog = {
        title: 'Component renders without url and likes',
        author: 'Robert Jhonson',
        url: 'https://example.com',
        likes: 12,
        user: { name: 'Sergey' }
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Component renders without url and likes', { exact: false })
    expect(title).toBeVisible()

    const url = screen.getByText('https://example.com', { exact: false })
    expect(url).not.toBeVisible()
})

test('blog url and number of likes are shown when button is clicked', async () => {
    const blog = {
        title: 'Component renders without url and likes',
        author: 'Robert Jhonson',
        url: 'https://example.com',
        likes: 12,
        user: { name: 'Sergey' }
    }

    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'show'})

    await user.click(button)

    const likes = screen.getByText('12', { exact: false})
    const url = screen.getByText(/http/i,{ exact: false })
    expect(likes).toBeVisible()
    expect(url).toBeVisible()
})

test('double likes works properly', async () => {
    const blog = {
        title: 'Component renders without url and likes',
        author: 'Robert Jhonson',
        url: 'https://example.com',
        likes: 12,
        user: { name: 'Sergey' }
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} addLike={mockHandler}/>)
    
    const user = userEvent.setup()
    const buttonShow = screen.getByRole('button', { name: 'show'})
    await user.click(buttonShow)
    const buttonLike = screen.getByRole('button', { name: 'like'})
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)

})