const { readFile, readdir, writeFile, mkdir } = require('fs').promises
const { join } = require('path')
const TOML = require('@iarna/toml')
const { Liquid } = require('liquidjs')
const liquid = new Liquid()

exports.writer = async function build(path) {
  const contentPath = join(path, 'content')
  const files = await readdir(contentPath)
  files.forEach(async file => {
    try {
      const content = await readFile(join(contentPath, file))
      const toml = TOML.parse(content)
      const configTemplate = toml.config && toml.config.template
      const templatesPath = join(path, 'templates')
      const templatePath = configTemplate
        ? join(templatesPath, configTemplate)
        : join(templatesPath, 'index.liquid')
      const template = (await readFile(templatePath)).toString()
      const output = await liquid.parseAndRender(template, toml)
      const dist = join(path, 'dist')
      try {
        await mkdir(dist)
      } catch (e) {}
      writeFile(join(dist, file.replace('.toml', '.html')), output)
    } catch (e) {
      console.error(e)
    }
  })
}
