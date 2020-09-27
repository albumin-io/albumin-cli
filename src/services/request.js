const API = require('./../services/api.js')

module.exports = {
  createContainer({repo}){
    return API({
      url: 'http://localhost:3001/api/docker/create',
      method: 'POST',
      body: {
        repo
      }
    })
  }
}