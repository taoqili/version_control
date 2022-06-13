const path = require('path')
const shelljs = require('shelljs')
module.exports = {
  addVersion({repository, branch, rootDir, project, version, res}) {
    const targetDir = path.resolve(rootDir, project, version)
    const tmpDir = `./tmp/${project}`
    if (!shelljs.which('git')) {
      res.send({
        code: 3,
        msg: '未安装GIT'
      })
      return
    }
    const { code } = shelljs.exec(`git clone ${repository} ${tmpDir}`)
    if (code !== 0) {
      res.send({code: 4, msg: '克隆仓库失败，请重试'})
      return
    }
    shelljs.echo('clone end')
    shelljs.cd(tmpDir)
    shelljs.exec(`git checkout ${branch}`)
    const { code: installCode } = shelljs.exec(`cnpm i`)
    if (installCode !== 0) {
      res.send({code: 6, msg: '依赖安装失败，请重试'})
      return
    }
    shelljs.echo('npm install end, start to build')
    const { code: buildCode } = shelljs.exec('npm run build')
    if (buildCode !== 0) {
      res.send({code: 8, msg: '构建失败，请重试'})
      return
    }
    shelljs.echo('build end')
    shelljs.rm('-rf', targetDir)
    shelljs.echo('rm targetDir end')
    shelljs.cp('-R', project, targetDir)
    shelljs.echo('copy end', targetDir)
    shelljs.cd('../../')
    shelljs.rm('-rf',tmpDir)
    shelljs.echo('rm tmp end', tmpDir)
    res.send({code: 0, msg: `分支${branch}发布成功!`})
  }
}
