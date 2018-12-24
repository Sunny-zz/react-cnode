import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter'
class Topic extends Component {
  state = {
    topic: null,
    comment: '',
    otherComment: ''
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
      //  将该对象下的 replies 数组内的每一项添加一条属性  isShowArea 来控制该评论下的 文本输入框是否展示
      res.data.data.replies = res.data.data.replies.map(e => {
        e.isShowArea = false
        return e
      })
      this.setState({
        topic: res.data.data
      })
    })
  }
  render() {
    const { topic, comment, otherComment } = this.state
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
                    this.showArea(e.author.loginname, e.id)
                  }}
                >
                  回复
                </button>
                {e.isShowArea ? (
                  <div>
                    <textarea
                      name='otherComment'
                      value={otherComment}
                      onChange={this.handleText}
                    />
                    <button
                      onClick={() => {
                        this.addOtherComment(e.id)
                      }}
                    >
                      回复
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
          {token ? (
            <div>
              <h4>添加回复</h4>
              <textarea
                name='comment'
                value={comment}
                onChange={this.handleText}
              />
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
      [e.target.name]: e.target.value
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
  showArea = (loginname, id) => {
    const { topic } = this.state
    const newTopic = { ...topic }
    if (newTopic.replies.find(e => e.isShowArea)) {
      newTopic.replies.find(e => e.isShowArea).isShowArea = false
    }
    newTopic.replies.find(e => e.id === id).isShowArea = true
    // newTopic.replies = newTopic.replies.map(e => {
    //   if (e.isShowArea) {
    //     e.isShowArea = false
    //   }
    //   if (e.id === id) {
    //     e.isShowArea = true
    //   }
    //   return e
    // })
    console.log(newTopic)
    this.setState({
      topic: newTopic,
      otherComment: `@${loginname} `
    })
  }
  addOtherComment = id => {
    const { topic, otherComment } = this.state
    const { token } = sessionStorage
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: token,
        content: otherComment,
        reply_id: id
      })
      .then(res => {
        this.getTopic()
        this.setState({
          otherComment: ''
        })
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
