import React, { Component } from 'react'
import styled from 'styled-components'
class Aside extends Component {
  componentDidMount() {}
  render() {
    const { isLogin } = this.props
    const { loginname, avatar_url } = sessionStorage
    return isLogin ? (
      <Wrap>
        <div>个人信息</div>
        <div>
          <img style={{ width: '50px' }} src={avatar_url} alt='' />
          <span>{loginname}</span>
          <br />
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
