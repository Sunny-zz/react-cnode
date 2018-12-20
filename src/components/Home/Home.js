import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
class Home extends Component {
  state = {
    topics: []
  }
  componentDidMount() {
    axios.get('https://cnodejs.org/api/v1/topics?tab=share').then(res => {
      this.setState({
        topics: res.data.data
      })
    })
  }

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
    const { topics } = this.state
    const nav = navArr.map(e => <li key={e.type}>{e.txt}</li>)
    const list =
      topics.length === 0 ? (
        '请稍等。。。'
      ) : (
        <ul>
          {topics.map(e => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      )
    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        {list}
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
`
