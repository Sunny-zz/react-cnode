const filter = tab => {
  switch (tab) {
    case 'good':
      return '精华'
    case 'ask':
      return '问答'
    case 'job':
      return '招聘'
    case 'share':
      return '分享'
    default:
      break
  }
}
export { filter }
