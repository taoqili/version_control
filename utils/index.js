const path = require('path')
const shelljs = require('shelljs')
module.exports = {
  addVersion({project, repository, branch, rootDir, name, version, res, env}) {
    const targetDir = path.resolve(rootDir, name, version)
    const tmpDir = `./tmp/${name}`
    if (!shelljs.which('git')) {
      res.send({ code: 3, msg: '未安装GIT'})
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
    const { code: installCode } = shelljs.exec(`yarn install`)
    if (installCode !== 0) {
      res.send({code: 6, msg: '依赖安装失败，请重试'})
      return
    }
    shelljs.echo('npm install end, start to build')
    const { code: buildCode } = shelljs.exec(`yarn run build:${project === 'xuelei' ? env : 'eimos' + env}`)
    if (buildCode !== 0) {
      res.send({code: 8, msg: '构建失败，请重试'})
      return
    }
    shelljs.echo('build end')
    shelljs.rm('-rf', targetDir)
    shelljs.echo('rm targetDir end')
    const { code: copyCode } = shelljs.cp('-R', name, targetDir)
    if (copyCode !==0 ) {
      res.send({code: 9, msg: '复制文件失败，请检查目标文件夹是否存在'})
      return
    }
    shelljs.echo('copy end', targetDir)
    shelljs.cd('../../')
    shelljs.rm('-rf',tmpDir)
    shelljs.echo('rm tmp end', tmpDir)
    res.send({code: 0, msg: `分支${branch}发布成功!`})
  }
}
