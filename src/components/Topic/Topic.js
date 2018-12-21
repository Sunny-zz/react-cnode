import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter'
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
      </Article>
    ) : (
      <div>请稍等</div>
    )
    return <Wrap>{article}</Wrap>
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
