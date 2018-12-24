import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import styled from 'styled-components'
import Topic from '../Topic/Topic'
import Aside from '../Aside/Aside'
class Main extends Component {
  render() {
    const { isLogin } = this.props
    return (
      <Wrap>
        <Switch>
          <Route component={Topic} path='/topic/:id' />
          <Route component={Home} path='/' />
        </Switch>
        <Aside isLogin={isLogin} />
      </Wrap>
    )
  }
}

export default Main
const Wrap = styled.div`
  width: 960px;
  margin: 20px auto 0;
  display: flex;
`
