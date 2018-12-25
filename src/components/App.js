import React, { Component } from 'react'
import '../static/gloable.css'
import Header from './Header/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main/Main'

class App extends Component {
  state = {
    isLogin: false,
    user: {}
  }
  componentDidMount() {
    // 处理刷新的时候状态变回原来
    const { loginname, avatar_url } = sessionStorage
    this.setState({
      isLogin: loginname && avatar_url ? true : false
    })
    window.onbeforeunload = e => {
      const eve = window.event || e
      eve.returnValue = '是否确定离开'
    }
  }

  render() {
    const { isLogin } = this.state
    return (
      <Router>
        <div style={{ backgroundColor: '#e1e1e1' }}>
          <Header setLogin={this.setLogin} />
          <Main isLogin={isLogin} />
        </div>
      </Router>
    )
  }
  setLogin = bool => {
    this.setState({
      isLogin: bool
    })
  }
}

export default App
