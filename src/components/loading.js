const {Spinner} = require('clui')
const chalk = require('chalk')

module.exports = new Spinner('Processing...', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'].map( el => chalk.rgb(255, 145, 0)(el)))