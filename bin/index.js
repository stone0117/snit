#!/usr/bin/env node
const path          = require('path')
const child_process = require('child_process')
const { Command }   = require('commander')
const program       = new Command()
program.version('0.0.1')

;(async function () {await main()})()

async function initMaven() {
  await pExec('cp -R $HOME/soft/template/maven/* ./')
  let pwd = await pExec('echo $PWD')
  let project_name = path.basename(pwd.trim())
  let cmd          = `sed -i '' "s/BITEMPLATEEI/${project_name}/g" "${path.resolve(__dirname, './pom.xml')}"`
  await pExec(cmd)
}

async function main() {
  program
    .command('init <template>')
    .description('根据模板初始化项目')
    .action(async (template) => {
      switch (template) {
        case 'maven':
          await initMaven()
          break
        default:
          console.log('not matched')
      }
    })
  await program.parseAsync(process.argv)
}

function pExec(cmd, encoding = 'utf8', maxBuffer = 1000 * 1000 * 10) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, {
      encoding : encoding,
      maxBuffer: maxBuffer, // default 200 * 1024
    }, function (err, stdout, stderr) {
      if (err) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}