import React from 'react'
import {createStore} from 'redux'
import reducer from './reducers'
const store = createStore(reducer)

const Statistiikka = (props) => {
  const eiPalautteita = (store.getState().good+store.getState().ok+store.getState().bad)===0

  if (eiPalautteita) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>hyviä</td>
            <td>{(store.getState().good/(store.getState().good+store.getState().ok+store.getState().bad)).toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.klik('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type:nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka klik={this.klik} />
      </div>
    )
  }
}

export {App,store};