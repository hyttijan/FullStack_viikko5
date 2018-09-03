import React from 'react';
import reducer from './reducer';
import {createStore} from 'redux'
const store = createStore(reducer)

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {anecdote:""}
  }
  handleChange = (event)=>{
    this.setState({anecdote:event.target.value})
  }
  handleSubmit = (event)=>{
    event.preventDefault()
    store.dispatch({type:"CREATE",anecdote:this.state.anecdote})
    this.setState({anecdote:""})
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={()=>{store.dispatch({type:"VOTE",id:anecdote.id})}}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input onChange={this.handleChange} value={this.state.anecdote} type="text" name="anecdote" /></div>
          <input type="submit" value="create"/> 
        </form>
      </div>
    )
  }
}

export {App,store}