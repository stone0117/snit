const fs            = require('fs')
const path          = require('path')
const child_process = require('child_process')

function pWriteTextFile(filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, 'utf8', function (err) {
      if (err) {reject(err)} else {resolve()}
    })
  })
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

;(async function () {try {await main()} catch (err) {console.error(err)}})()

async function main() {await entry()}

async function entry() {

  const packageJson = require('./package.json')

  const oVersion          = packageJson.version
  const split             = oVersion.split('.')
  const num               = parseInt(split[split.length - 1])
  split[split.length - 1] = num + 1
  packageJson.version     = split.join('.')

  try {
    await pWriteTextFile(path.resolve(__dirname, './package.json'), JSON.stringify(packageJson, null, 2))
    console.log(`\x1b[32m${`${oVersion} => ${packageJson.version}`}\x1b[0m`)
    await pExec('npm publish')
    await pExec('npm i -g snit')
  } catch (err) {
    console.error(err)
  }
}


