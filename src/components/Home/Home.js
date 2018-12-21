import React, { Component } from 'react'
import styled from 'styled-components'
import Topics from '../Topics/Topics'
import { Route, NavLink } from 'react-router-dom'
class Home extends Component {
  render() {
    const navArr = [
      {
        type: 'all',
        txt: '全部'
      },
      {
        type: 'good',
        txt: '精华'
      },
      {
        type: 'share',
        txt: '分享'
      },
      {
        type: 'ask',
        txt: '问答'
      },
      {
        type: 'job',
        txt: '招聘'
      }
    ]
    const nav = navArr.map(e => (
      <li key={e.type}>
        <NavLink
          to={`/${e.type === 'all' ? '' : e.type}`}
          exact={e.type === 'all' ? true : false}
        >
          {e.txt}
        </NavLink>
      </li>
    ))
    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        <Route component={Topics} path='/' exact />
        <Route component={Topics} path='/share' />
        <Route component={Topics} path='/job' />
        <Route component={Topics} path='/ask' />
        <Route component={Topics} path='/good' />
      </Wrap>
    )
  }
}

export default Home
const Wrap = styled.div`
  width: 660px;
  background-color: #fff;
`
const Nav = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  height: 40px;
  background-color: #f6f6f6;
  align-items: center;
  padding-left: 10px;
  li {
    margin-right: 20px;
  }
  li a {
    color: #80bd01;
    padding: 2px 6px;
    border-radius: 5px;
  }
  li .active {
    background-color: #80bd01;
    color: #fff;
  }
`
