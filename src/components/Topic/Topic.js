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
    const { token } = sessionStorage

    axios
      .get(
        `https://cnodejs.org/api/v1/topic/${id}?${
          token ? `accesstoken=${token}` : ''
        }`
      )
      .then(res => {
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
        {token ? (
          <button
            onClick={() => {
              this.collect(topic.id)
            }}
          >
            {topic.is_collect ? '取消收藏' : '收藏'}
          </button>
        ) : (
          ''
        )}
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
                <div>
                  <button
                    onClick={() => {
                      this.ups(e.id)
                    }}
                  >
                    点赞
                  </button>
                  {e.ups.length}
                </div>
                <button
                  onClick={() => {
                    this.showArea(e.author.loginname, e.id)
                  }}
                >
                  回复
                </button>
                <span dangerouslySetInnerHTML={{ __html: e.content }} />

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
      .post(`https://cnodejs.org/api/v1/topic/${topic.id}/replies`, {
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
  ups = id => {
    const { token } = sessionStorage
    const { topic } = this.state
    axios
      .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
        accesstoken: token
      })
      .then(res => {
        console.log(res.data.action)
        const userId = sessionStorage.id
        const newTopic = { ...topic }
        // 一下操作是更新本地的点赞  也就是更新了 topic.replies 下面的某条评论下的 ups 数组
        // 当返回的 action 是 up 的时候，也就说明原来没点赞，点了之后就要讲你的 id 添加到 ups 内，反之删除，在这里为什么不使用 axios 请求重新获取数据，因为可以直接对 state 进行修改，就完全和网上的数据一致了，所以不发请求更新。
        // 判断是否点过赞 可以使用 res.data.action  也可以使用 获取主题详情的时候添加参数 token，返回的数据中 评论数组内会有 isuped 属性
        if (res.data.action === 'up') {
          newTopic.replies.find(e => e.id === id).ups.push(userId)
        } else {
          newTopic.replies.find(e => e.id === id).ups = newTopic.replies
            .find(e => e.id === id)
            .ups.filter(e => e !== userId)
        }
        this.setState({
          topic: newTopic
        })
      })
  }
  collect = id => {
    const { token } = sessionStorage
    const { topic } = this.state
    const isCollect = topic.is_collect
    axios
      .post(
        `https://cnodejs.org/api/v1/topic_collect/${
          isCollect ? 'de_collect' : 'collect'
        }`,
        {
          accesstoken: token,
          topic_id: id
        }
      )
      .then(() => {
        const newTopic = { ...topic }
        newTopic.is_collect = !newTopic.is_collect
        this.setState({
          topic: newTopic
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
