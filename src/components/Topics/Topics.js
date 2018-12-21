import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class Topics extends Component {
  state = {
    topics: []
  }
  componentDidMount() {
    const { pathname } = this.props.location
    // console.log(pathname.slice(1))
    // console.log(pathname.replace('/', ''))
    axios
      .get(`https://cnodejs.org/api/v1/topics?tab=${pathname.replace('/', '')}`)
      .then(res => {
        this.setState({
          topics: res.data.data
        })
      })
  }

  render() {
    const { topics } = this.state
    console.log(topics)

    const list =
      topics.length === 0 ? (
        '请稍等。。。'
      ) : (
        <List>
          {topics.map(e => (
            <li key={e.id}>
              <img src={e.author.avatar_url} alt='' />{' '}
              <span className='count'>
                <span title='回复数'>{e.reply_count}</span>/
                <span title='阅读量'>{e.visit_count}</span>
              </span>
              {e.top ? <span className='top'>置顶</span> : ''}
              <Link to={`/topic/${e.id}`}>
                <span className='title'>{e.title}</span>
                <span className='time'>1 小时之前</span>
              </Link>
            </li>
          ))}
        </List>
      )
    return <div>{list}</div>
  }
}

export default Topics
const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  li {
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    display: flex;
    align-items: center;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  li img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-left: 8px;
    flex-shrink: 0;
  }
  li .count {
    width: 55px;
    text-align: center;
    font-size: 12px;
    margin-left: 10px;
    flex-shrink: 0;
  }
  li .top {
    padding: 2px;
    background-color: #80bd01;
    color: #fff;
    flex-shrink: 0;
    font-size: 12px;
    border-radius: 4px;
    margin-right: 8px;
  }
  li > a {
    flex-grow: 1;
    display: flex;
  }
  li > a > .title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #888;
  }
  li > a > .time {
    width: 60px;
    text-align: right;
    font-size: 12px;
    flex-shrink: 0;
  }
`
