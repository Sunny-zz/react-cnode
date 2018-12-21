import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import styled from 'styled-components'
import Topic from '../Topic/Topic'
class Main extends Component {
  render() {
    return (
      <Wrap>
        <Switch>
          <Route component={Topic} path='/topic/:id' />
          <Route component={Home} path='/' />
        </Switch>
      </Wrap>
    )
  }
}

export default Main
const Wrap = styled.div`
  width: 960px;
  margin: 20px auto 0;
`
