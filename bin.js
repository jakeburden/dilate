#!/usr/bin/env node

const minimist = require('minimist')

const lib = require('./')

const argv = minimist(process.argv.slice(2))

;(function main(argv) {
  let dir = argv._[0]

  if (!dir) dir = process.cwd()

  lib.writer(dir)
})(argv)
