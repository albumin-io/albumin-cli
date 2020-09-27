

const file = require('./../services/file')
const loading = require('./../components/loading');
const show = require('../components/show.js');
const requests = require('../services/request.js');
const git = require('../services/git.js');
const prompt = require('prompt-sync')()
const debug = require('debug')('albumin:commander')



module.exports = async function({ args:[path], port, domain}){

  debug(path, port, domain)

  loading.start()

  if(!path) return console.log("No path was provided.")

  path = file.resolve(path)

  debug(path)

  if(!file.validate(path)) return console.log('Path is invalid. Check if the folde is reacheable of if you have the correct permissions.')
  if(!git.validate(path)) return console.log('Path is not a valid git repository. Check for the hidden ./.git folder inside it.')

  let url =  await git.remoteUrl(path)

  debug(url)

  const isPrivate = await git.isPrivate(url)

  if(isPrivate){
    show.bold('It seams that this is a private repository.')
    url.username  = prompt('Username:');
    url.password= prompt('Token:', {echo: '*'});
  }


  debug(url)

  try{
    const res = await requests.createContainer({
      repo: url.href,
    })

    loading.stop()
    show.primary(`URL: ${res.url}`)

    return true
  } catch(err){
    loading.stop()
    throw err
  }





}