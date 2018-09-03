import React from 'react'
import {Blog,compareLikes} from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      user:null,
      blogFormVisible:false,
      notification:null,
      blogs: []
    }
  }
  handleLogin = async(event)=>{
    event.preventDefault()
    const username = event.target.username.value;
    const password = event.target.password.value;
    try{

      const user = await loginService.login({username:username,password:password})
    
      if(user.token){
        window.localStorage.setItem('loggedUser',JSON.stringify(user))
        blogService.setToken(user.token)
        this.setState({user:{
                          username:user.username,
                          name:user.name,
                          token:user.token
                          }
                    })  
      }
      else{

        this.setState({notification:user.error})
        setTimeout(()=>{this.setState({notification:null})},5000)
      }

    }
    catch(exception){
      this.setState({notification:"Unknown error"})
      setTimeout(()=>{this.setState({notification:null})},5000)
    }
    
  }
  handleNewBlog = async(event)=>{
    event.preventDefault()
    try{
      const blog = {
                  title: event.target.title.value,
                  author: event.target.author.value,
                  url: event.target.url.value,
                  token: this.state.user.token
                  }
      const response = await blogService.create(blog)
      const notification = `a new blog '${response.title}' by ${response.author} was added`
      this.setState({notification:notification, blogs:[...this.state.blogs,response]})
      setTimeout(()=>{this.setState({notification:null})},5000)
    }
    catch(exception){
      this.setState(exception)
    }
  }
  handleLike = async(blog)=>{
    try{
      blog.likes+=1
      const response = await blogService.update(blog)
      const id = blog._id
      this.setState({blogs:this.state.blogs.map(blog=>blog._id!==id?blog:response).sort(compareLikes)})
    }
    catch(exception){
      this.setState(exception)
    }
  }
  handleDelete = async(deletedBlog)=>{
    try{
      if(window.confirm(`delete '${deletedBlog.title}' by ${deletedBlog.author}`))
      await blogService.remove(deletedBlog)
      this.setState({blogs:this.state.blogs.filter((blog)=>blog._id!==deletedBlog._id)})
    }
    catch(exception){
      console.log(exception)
    }
  }
  handleBlogFormVisibility = ()=>{
    this.setState({blogFormVisible:!this.state.blogFormVisible})
  }
  handleLogout = ()=>{
    window.localStorage.removeItem("loggedUser")
    this.setState({user:null})
  }
  componentDidMount() {
    blogService.getAll().then((blogs) =>{
      this.setState({ blogs })
    }
    ).catch((error)=>{this.setState({notification:error.data})})
    if(window.localStorage.getItem("loggedUser")){
      const user = JSON.parse(window.localStorage.getItem("loggedUser"));
      this.setState({user:user})
      blogService.setToken(user.token)  
    }
    
  } 

  render() {

        return(
        <div>
          <p>{this.state.notification}</p>
          {this.state.user===null?
            <LoginForm handleLogin={this.handleLogin}/>
            :
            <div>
              <BlogList handleDelete={this.handleDelete} handleLike={this.handleLike} user={this.state.user} blogs={this.state.blogs} handleLogout={this.handleLogout}/>
              <BlogForm handleBlogFormVisibility={this.handleBlogFormVisibility} blogFormVisible={this.state.blogFormVisible} handleNewBlog={this.handleNewBlog}/>
            </div>
          }     
        </div>
        )
    }
}
const BlogList = (props)=>{
  return(
    <div className="blogList">
      <h2>blogs</h2>
      {props.user.name} logged in <button onClick={props.handleLogout}>Log out </button>
      {props.blogs.map(blog =>{return(
        <Blog key={blog._id} handleLike={props.handleLike} handleDelete={props.handleDelete} blog={blog} user={props.user}/>  
      )}
      )}
    </div>
  )

}
const BlogForm = (props) =>{
  const showWhenVisible = { display: props.blogFormVisible ? '' : 'none' }
  return (
        <div>
          {props.blogFormVisible?
            <button onClick={props.handleBlogFormVisibility}>Hide blog form</button>
            :
            <button onClick={props.handleBlogFormVisibility}>Show blog form</button>
          }
          <form style={showWhenVisible} onSubmit={props.handleNewBlog}>
          <h2>Add a new blog</h2>
          <div>
           <label htmlFor="title">title:</label>
           <input name="title" type="text"/>
          </div>
          <div>
           <label htmlFor="author">author:</label>
           <input name="author" type="text"/>
          </div>
          <div> 
           <label htmlFor="url">url:</label>
           <input name="url" type="text"/>
          </div>
          <input type="submit" value="Add"/>
          </form>
        </div>
  );
}

const LoginForm = (props) =>{
  return(
    <div className="loginForm">
     <h2>Login to app</h2>
     <form onSubmit={props.handleLogin}>
       <div>
         <label htmlFor="username">username:</label>
         <input name="username" type="text"/>
       </div>
       <div>
         <label htmlFor="username">password:</label>
         <input name="password" type="password"/>
       </div>
       <input type="submit" value="Login"/>
     </form>
    </div>
  )

}

export default App;
