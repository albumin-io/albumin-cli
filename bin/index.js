#!/usr/bin/env node

const { program } = require('commander');
const npm = require('./../package.json')

program
  .version(npm.version)
  .usage('[command] [options] <project_folder>')
  .description('Runs a container on Albumin.io platform. If no option is provided, create a contain that will self destroy in 30 minutes')



program 
  .command('create')
  .usage('[options] <project_folder>')
  .option('-p, --port <port>', 'Specify the port of your application.')
  .option('-d, --domain <domain>', 'Specify the domain of your application.')
  .action(require('./../src/routes/create'))


program.parse(process.argv);