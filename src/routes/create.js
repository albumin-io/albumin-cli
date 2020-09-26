const API = require('./../services/api.js')
const git = require('simple-git')
const path = require('path');
const fs = require('fs')
const chalk = require('chalk')
const {Spinner} = require('clui')

const spin = new Spinner('Processing...', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'].map( el => chalk.rgb(255, 145, 0)(el)))

module.exports = async function(cmd,env){

  spin.start()

  if(!cmd.args[0]) return console.log("No path was provided.")

  const repoPath = path.resolve(cmd.args[0])

  //Check if the repository directory exists
  if(!fs.existsSync(repoPath)) {
    return console.log("Unable to reach directory.")
  } 

  const remoteUrl = await git(repoPath)
    .checkIsRepo()
    .listConfig()
    .then(config => config.values['.git/config']['remote.origin.url'])

  const res = await API({
    url: 'http://localhost:3001/api/docker/create',
    method: 'POST',
    body: {
      repo: remoteUrl
    }
  })

  spin.stop()

  console.log(chalk.rgb(255, 145, 0)(`URL: ${res.url}`))
  console.log(chalk.rgb(255, 145, 0)(`Key: your-key`))
}