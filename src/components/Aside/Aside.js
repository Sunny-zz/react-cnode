import React, { Component } from 'react'
import styled from 'styled-components'
class Aside extends Component {
  componentDidMount() {}
  render() {
    const { isLogin } = this.props
    return isLogin ? (
      <Wrap>
        <div>个人信息</div>
        <div>
          <img src='' alt='' />
          <span>积分： 100</span>
        </div>
        <div>
          <button>发布主题</button>
        </div>
      </Wrap>
    ) : (
      <div>登录</div>
    )
  }
}

export default Aside
const Wrap = styled.div`
  margin-left: 20px;
  width: 290px;
  display: flex;
  flex-direction: column;
`
