const fs = require('fs')
const _path = require('path');

module.exports = {
  validate: (path) => !!fs.existsSync(path),
  resolve: (path) => _path.resolve(path)
}