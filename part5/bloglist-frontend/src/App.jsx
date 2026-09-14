import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [style, setStyle] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const showMessage = (text, type) => {
    setNotification(text)
    setStyle(type)
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('LoggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage('Wrong username or password', 'error')
      return console.error(error)
    }
    console.log(`loggin in with ${username}, ${password}`)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedBlogAppUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(obj => {
        setBlogs(blogs.concat(obj))
        showMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'notify')
      })
      .catch(error => {
        showMessage('Failed to added blog', `${error.message}`)
      })
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const returnedBlog = await blogService.update(updatedBlog, blog.id)

    setBlogs(blogs.map(n => n.id !== blog.id ? n : returnedBlog))
  }

  const removeBlog = async (blog) => {

    try {
      if(window.confirm(`Are you sure to delete ${blog.title}?` )){
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(n => n.id !== blog.id))
      } else {
        return
      }
    } catch (error) {
      showMessage(`Something went wrong, ${error.message}`)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} style={style} />
      {!user && loginForm()}
      {user && (
        <div><p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          < div >
            <h2>Blogs</h2>
            {
              [...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                  <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
                )
            }
          </div >
        </div>)
      }

    </div>
  )
}

export default App





