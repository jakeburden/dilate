# dilate

A static blog generator that turns TOML files into HTML using Liquid templates.

## What is this?

dilate watches your content and template directories and rebuilds your site when you make changes. You write content in TOML, create templates in Liquid, and get static HTML out. It uses Parcel to bundle JavaScript and CSS.

I made this because I wanted something simpler than Jekyll but more structured than just writing HTML by hand. No config files, no plugins, no theme system. Just content files and templates.

## Install

```bash
npm i dilate -g
```

## Usage

```bash
dilate <path>
```

Point it at a directory with `content/` and `templates/` folders. If you don't give it a path, it uses the current directory.

## How it works

Put TOML files in `content/` and Liquid templates in `templates/`. dilate reads each `.toml` file, finds the matching template, and renders HTML into `dist-tmp/`.

```
my-blog/
├── content/
│   ├── index.toml
│   └── hello-world.toml
├── templates/
│   ├── index.liquid
│   └── blog.liquid
└── dist-tmp/          (generated)
```

Example content file:

```toml
[config]
template = "index"

[header]
bio = "This is my blog."
```

Example template:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Blog</title>
  </head>
  <body>
    <header>{{ header.bio }}</header>
  </body>
</html>
```

Each `.toml` file becomes an `.html` file. If you specify a template in the `[config]` section, it uses that. Otherwise it uses `index.liquid`.

## Status

This is still early. The API will probably change. I'm using it for my own site but it's rough around the edges.

![](dilate.gif)
