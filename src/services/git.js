const git = require('simple-git')

module.exports = {
  validate(path){
    return git(path).checkIsRepo()
  },

  remoteUrl(path){
    return git(path)
      .listConfig()
      .then(config => new URL(config.values['.git/config']['remote.origin.url']))
  },

  async isPrivate(url){
    try{
      const res = await git(url.href).listRemote([url, 'HEAD'])
      return false
    } catch(err){
      return true
    }
  },
}