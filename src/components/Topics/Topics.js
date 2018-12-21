import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
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
              <img src={e.author.avatar_url} alt='' /> {e.title}
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
    width: 40px;
    height: 40px;
  }
`
