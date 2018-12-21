import React, { Component } from 'react'
import axios from 'axios'
class Topics extends Component {
  state = {
    topics: []
  }
  componentDidMount() {
    const { pathname } = this.props.location
    // console.log(pathname.slice(1))
    // console.log(pathname.replace('/', ''))
    console.log(this.props)
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
    const list =
      topics.length === 0 ? (
        '请稍等。。。'
      ) : (
        <ul>
          {topics.map(e => (
            <li key={e.id}> {e.title}</li>
          ))}
        </ul>
      )
    return <div>{list}</div>
  }
}

export default Topics
