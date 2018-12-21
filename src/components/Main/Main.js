import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../Home/Home'
import styled from 'styled-components'
class Main extends Component {
  render() {
    return (
      <Wrap>
        <Route component={Home} path='/' />
      </Wrap>
    )
  }
}

export default Main
const Wrap = styled.div`
  width: 960px;
  margin: 20px auto 0;
`
