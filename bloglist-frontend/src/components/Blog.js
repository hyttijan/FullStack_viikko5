import React from 'react'
import PropTypes from 'prop-types'
const Blog = ({blog,handleLike,handleDelete, user}) => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return(<Togglable  key={blog._id}>
          <div style={blogStyle} className="general">
           {blog.title} {blog.author}
          </div>
          <div style={blogStyle} className="detail">
            <div>
            {blog.title}
            </div>
            <div>
            <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
            {blog.likes} likes
            <button onClick={()=>handleLike(blog)}>like</button>
            </div>
            <div>
            Added by {(blog.user!==undefined)&&blog.user.name}
            </div>  
            {(blog.user===undefined||user.username===blog.user.username) &&<button onClick={()=>handleDelete(blog)}>delete</button>}
          </div>
      </Togglable>
)}
Blog.propTypes={
  blog: PropTypes.object.isRequired
}
const compareLikes = (blog,otherBlog)=>{
  if (blog.likes<otherBlog.likes) {
    return 1;
  }
  if (blog.likes>otherBlog.likes) {
    return -1;
  }
  return 0;
}


const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="content">
      {blog.title} {blog.author}
    </div>
    <div className="additional_content">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }


  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    return (
      <div>
        <div className="toggler" onClick={this.toggleVisibility}>
          {this.props.children[0]}
        </div>
        <div style={showWhenVisible} className="togglable">
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}

export {Blog, SimpleBlog, compareLikes, Togglable}

