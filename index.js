const { readFile, readdir, writeFile, mkdir } = require('fs').promises
const { join } = require('path')
const TOML = require('@iarna/toml')
const { Liquid } = require('liquidjs')
const liquid = new Liquid()
const watcher = require('@parcel/watcher')
const Bundler = require('parcel-bundler')

exports.writer = async function writer(path) {
  const contentPath = join(path, 'content')
  const files = await readdir(contentPath)
  files.forEach(async (file, idx, arr) => {
    try {
      const content = await readFile(join(contentPath, file))
      const toml = TOML.parse(content)
      const configTemplate = toml.config && toml.config.template
      const templatesPath = join(path, 'templates')
      const templatePath = configTemplate
        ? join(templatesPath, configTemplate + '.liquid')
        : join(templatesPath, 'index.liquid')
      const template = (await readFile(templatePath)).toString()
      const output = await liquid.parseAndRender(template, toml)
      const dist = join(path, 'dist-tmp')
      try {
        await mkdir(dist)
      } catch (e) {}
      await writeFile(join(dist, file.replace('.toml', '.html')), output)
      if (idx === arr.length - 1) {
        const bundler = new Bundler(join(dist, 'index.html'))
        bundler.bundle()
      }
    } catch (e) {
      console.error(e)
    }
  })
}

exports.watch = function watch(path, cb) {
  watcher.subscribe(join(path, 'content'), cb)
  watcher.subscribe(join(path, 'templates'), cb)
}
