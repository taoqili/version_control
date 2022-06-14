const utils = require('../utils')
const { deployRootDir } = require('../config')
module.exports = (req, res) => {
  const { project, name, version, repository, branch, env = 'dev' } = req.body || {}
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (!name || !version) {
    res.send({
      code: 1,
      msg: '缺失必要的参数，请检查后重试！',
    })
    return
  }
  try {
    utils.addVersion({
      res,
      project,
      rootDir: deployRootDir,
      repository,
      branch,
      name,
      version,
      env
    })
  } catch (e) {
    res.send({
      code: 2,
      msg: '发布失败，请稍后重试！',
    })
  }
}
