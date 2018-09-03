import React from 'react'
import { shallow, mount } from 'enzyme'
import {SimpleBlog, Blog} from './Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'
import loginService from '../services/login'
import App from '../App'
describe.only('<SimpleBlog />', () => {
  it('renders title,author and likes', () => {
    const simpleBlog = {
      title: 'Test title',
      author: 'Test author',
      likes: 1
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const contentDiv = blogComponent.find('.content')
    const additionalContent = blogComponent.find('.additional_content')
    expect(contentDiv.text()).toContain(`${simpleBlog.title} ${simpleBlog.author}`)
    expect(additionalContent.text()).toContain(`blog has ${simpleBlog.likes} likes`)
  })
  it('registers if like button is pushed', () => {
    const simpleBlog = {
      title: 'Test title',
      author: 'Test author',
      likes: 1
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={mockHandler} />)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
    
  })
})

describe.only('<Blog />', () => {
	it('shows details if it is clicked', () => {
    const blog = {
      _id: "test_id",
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.fi',
      likes: 1
    }
    const user = {

    }
    const mockHandler = jest.fn()
    const blogComponent = mount(
    	               <Blog key={blog._id}
    							   handleLike={mockHandler} 
    							   handleDelete={mockHandler} 
    							   blog={blog} 
    							   user={user}
    							  />
    							 )
    const generalDiv = blogComponent.find('.toggler')
    generalDiv.simulate('click')
    const detailDiv = blogComponent.find('.togglable')
    expect(detailDiv.getElement().props.style).toEqual({display:''})
    
    
  })
})

describe.only('<App/>',()=>{
  
 
  it('only shows login form when not logged in',()=>{
    const appComponent = mount(<App/>)
    const loginForm = appComponent.find(".loginForm")
    expect(loginForm.length).toEqual(1)
    const blogList = appComponent.find('.blogList')
    expect(blogList.length).toEqual(0)
  })
  it('shows blog list (and not loginFomr) to user when logged in',()=>{
    const user = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3MxIiwiaWQiOiI1YjZmMjc1ODAyNTkxOTMwN2UzYzFmYWIiLCJpYXQiOjE1MzU5ODE2MzV9.q2nCZprzGj7ZVrzKl85voOSLaUC8PlB065Bg-Rcy312",
      username: "Tess1",
      name: "Testi testi"
    }
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    const appComponent = mount(<App/>)
    appComponent.update()
    const loginForm = appComponent.find(".loginForm")
    expect(loginForm.length).toEqual(0)
    const blogList = appComponent.find('.blogList')
    expect(blogList.length).toEqual(1)
  })


})