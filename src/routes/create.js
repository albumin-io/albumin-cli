const {API} = require('./../services/api.js')
const git = require('simple-git')
const path = require('path');

module.exports = function(cmd,env){

  const repo = git(path.resolve(cmd.args[0]))
    .listRemote()
    .then(a => console.log(a))

//   API({
//       url: 'http://localhost:3001/api/docker/create'
//       method: 'POST',
//       body: {
//         port: cmd.port || 80,
//         repo: 
//       }
//   })
}