import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm/> works properly', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author name here')
    const inputUrl = screen.getByPlaceholderText('write url here')

    const createButton = screen.getByText('Create')

    await user.type(inputTitle, 'testing a form title')
    await user.type(inputAuthor, 'testing a form author')
    await user.type(inputUrl, 'testing a form url')

    await user.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    screen.debug()
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a form author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a form url')

})