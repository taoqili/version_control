const utils = require('../utils')
module.exports = (req, res) => {
  // TODO 此处需要部署本应用时配置
  const rootDir = '/var/www'

  const { project, version, repository, branch } = req.body || {}
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (!project || !version) {
    res.send({
      code: 1,
      msg: '缺失必要的参数，请检查后重试！',
    })
    return
  }
  try {
    utils.addVersion({
      rootDir,
      res,
      repository,
      branch,
      project,
      version
    })
  } catch (e) {
    res.send({
      code: 2,
      msg: '发布失败，请稍后重试！',
    })
  }
}
