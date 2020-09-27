const fetch = require('node-fetch')
const debug = require('debug')('albumin:api')

module.exports = function ({
  endpoint = '',
  url,
  method = 'GET',
  body,
  responseType = 'json',
}){
  
  url = url || process.env.API_SERVER;

  const headers = {
    'Content-Type': 'application/json'
  };

  const destination = url + endpoint;

  const request = {
    credentials: 'include',
    method,
    headers,
    ...(body ? {body: JSON.stringify(body)} : false),
  };

  debug(destination, request.body)

  return fetch(destination, request)
    .then((response) => {

      debug(response)
      // response.ok is the primary verification of fetch. 
      if (response.ok) {
        return response;
      } else {
        throw response;
      }
    })
    .catch(async (response) => {
      try{
        // checks for the body for any error messages.
        const errBody = await response[responseType]();
        throw errBody;
      } catch(err){
        switch (true) {
            
        // checks if there is a body at all.
        case (Object.keys(err).length > 0):
          throw new Error(JSON.stringify(err.message))
            
        // if it returns an error, it should return it's message.
        case !!response.message:
          throw new Error(response.message);
        
        // if it is a response from a request, it should return it's status text. 
        case !!response.statusText:
          throw new Error(response.statusText);
            
        // if none is provided, return undefined error.
        default:
          throw new Error('Undefined error');
        }
      }
    })

    // parse a valid response
    .then((response) => {
    
      // in case the response is ok, but it has no body. (eg: 201, 202)
      return response[responseType]()
        .catch(err => true)
    });

}