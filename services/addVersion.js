const path = require('path')
const utils = require('../utils')
module.exports = (req, res) => {
  const rootDir = path.resolve(__dirname, '../www')
  const { project, version } = req.query || {}
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (!project || !version) {
    res.send('缺失必要的参数，请检查后重试！')
    return
  }
  try {
    utils.addVersion(rootDir, project, version, res)
  } catch (e) {
    res.send('发布失败，请稍后重试！')
  }
}
