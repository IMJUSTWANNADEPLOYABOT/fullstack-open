import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setUrl('')
    setAuthor('')
    setTitle('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
                <label>
                      Title:
                  <input
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            placeholder='write title here'
                          />
                </label>
        <br />
                <label>
                  Author: 
                  <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write author name here'
        />
        </label>
        <br />
                <label>
                  Url: 
                  <input
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                            placeholder='write url here'
                          />
                </label>
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  )

}

export default BlogForm