import React, { Component } from 'react'
import axios from 'axios'
class Topic extends Component {
  state = {
    topic: null
  }
  componentDidMount() {
    // 要分成登录和未登录
    // 登陆的时候请求的文章详情是需要参数的
    const { id } = this.props.match.params
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
      this.setState({
        topic: res.data.data
      })
    })
  }

  render() {
    const { topic } = this.state
    console.log(topic)
    const article = topic ? (
      <div>
        <h2>{topic.title}</h2>
      </div>
    ) : (
      <div>请稍等</div>
    )
    return article
  }
}

export default Topic
