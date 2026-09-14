import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [visible, setVisible] = useState(false)

  let myStyle = visible ? '' : 'none'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} – by {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      <div style={{ display: myStyle }}>

        {blog.url}
        <br />
        likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {user?.username === blog.user?.username ? <button onClick={() => removeBlog(blog)}>remove</button> : ''}

      </div>

    </div>
  )
}

export default Blog