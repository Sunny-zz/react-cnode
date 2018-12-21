import React, { Component } from 'react'
import '../static/gloable.css'
import Header from './Header/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main/Main'
class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ backgroundColor: '#e1e1e1' }}>
          <Header />
          <Main />
        </div>
      </Router>
    )
  }
}

export default App
