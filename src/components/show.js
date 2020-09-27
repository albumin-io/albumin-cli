const chalk = require('chalk')

module.exports = {
  primary: (message) =>  console.log(chalk.rgb(255, 145, 0)(message)),
  bold: (message) => console.log(chalk.bold(message))
}