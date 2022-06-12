const path = require('path')
const shelljs = require('shelljs')
module.exports = {
  addVersion(rootDir, project, version, res) {
    const targetDir = path.resolve(rootDir, project, version)
    const origin = shelljs.exec('git remote -v')
    const branchName = shelljs.exec('git rev-parse --abbrev-ref HEAD')
    debugger
    const tmpDir = `./tmp/${project}`
    if (!shelljs.which('git')) {
      res.send('未安装GIT')
      return
    }
    const { code } = shelljs.exec(`git clone https://github.com/taoqili/111.git ${tmpDir}`)
    if (code !== 0) {
      res.send('克隆仓库失败，请重试')
      return
    }
    shelljs.echo('clone end, start to install npm')
    shelljs.cd(tmpDir)
    const { code: installCode } = shelljs.exec(`cnpm i`)
    if (installCode !== 0) {
      res.send('依赖安装失败，请重试')
      return
    }
    shelljs.echo('npm install end, start to build')
    const { code: buildCode } = shelljs.exec('npm run build')
    if (buildCode !== 0) {
      res.send('构建失败，请重试')
      return
    }
    shelljs.echo('build end')
    shelljs.rm('-rf', targetDir)
    shelljs.echo('rm targetDir end')
    shelljs.cp('-R', 'dist', targetDir)
    shelljs.echo('copy end', targetDir)
    shelljs.cd('../../')
    shelljs.rm('-rf',tmpDir)
    shelljs.echo('rm tmp end', tmpDir)
    res.send(`分支${branchName}发布成功!`)
  }
}
