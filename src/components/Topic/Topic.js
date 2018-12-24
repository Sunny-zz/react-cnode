import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter'
class Topic extends Component {
  state = {
    topic: null,
    comment: ''
  }
  componentDidMount() {
    // 要分成登录和未登录
    // 登陆的时候请求的文章详情是需要参数的
    this.getTopic()
  }
  getTopic = () => {
    const { id } = this.props.match.params
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
      console.log(res.data.data)
      this.setState({
        topic: res.data.data
      })
    })
  }
  render() {
    const { topic, comment } = this.state
    const { token } = sessionStorage
    console.log(this.props)
    const article = topic ? (
      <Article>
        <h2>{topic.title}</h2>
        <span>
          ·作者{topic.author.loginname} ·来自{filter(topic.tab)}
        </span>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
        <div>
          <h4>评论</h4>
          <ul>
            {topic.replies.map(e => (
              <li key={e.id}>
                <img
                  style={{ width: '40px' }}
                  src={e.author.avatar_url}
                  alt=''
                />
                <span dangerouslySetInnerHTML={{ __html: e.content }} />
                <button
                  onClick={() => {
                    this.handleButton(e.author.loginname)
                  }}
                >
                  回复
                </button>
              </li>
            ))}
          </ul>
          {token ? (
            <div>
              <h4>添加回复</h4>
              <textarea value={comment} onChange={this.handleText} />
              <button onClick={this.addComment}>评论</button>
            </div>
          ) : (
            ''
          )}
        </div>
      </Article>
    ) : (
      <div>请稍等</div>
    )
    return <Wrap>{article}</Wrap>
  }
  handleText = e => {
    this.setState({
      comment: e.target.value
    })
  }
  addComment = () => {
    const { topic, comment } = this.state
    const { token } = sessionStorage
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: token,
        content: comment
      })
      .then(res => {
        this.getTopic()
        this.setState({
          comment: ''
        })
      })
  }
  handleButton = loginname => {
    this.setState({
      comment: `@${loginname} `
    })
  }
}

export default Topic
const Wrap = styled.div`
  width: 660px;
  background-color: #fff;
`
const Article = styled.div`
  padding: 10px;
  width: 660px;
  background-color: #fff;
  .content img {
    width: 100%;
  }
`
