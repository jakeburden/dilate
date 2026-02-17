# dilate

> A lightweight static blog generator that transforms TOML content files into HTML using Liquid templates.

## What is dilate?

**dilate** is a file-watching static site generator designed for simplicity. It monitors your content and template directories, automatically rebuilding your site whenever changes are detected. Think of it as a minimal, convention-based approach to building blogs and simple websites.

### How it works

1. **Write content in TOML** - Create `.toml` files in your `content/` directory with structured data
2. **Design templates with Liquid** - Build reusable `.liquid` templates in your `templates/` directory  
3. **Auto-generate HTML** - dilate watches for changes and renders your content through templates into static HTML
4. **Bundle with Parcel** - Automatically bundles JavaScript and other assets using Parcel

### Key Features

- 📝 **TOML-based content** - Simple, readable content format
- 🎨 **Liquid templating** - Powerful, familiar template syntax
- 👀 **File watching** - Automatic rebuilds on content or template changes
- 📦 **Built-in bundling** - Parcel integration for modern web assets
- ⚡ **Zero config** - Works with a simple directory structure

## Install

```bash
$ npm i dilate -g
```

## Usage

```bash
$ dilate <path>
```

If no path is provided, dilate will use the current working directory.

### Project Structure

Your project should follow this structure:

```
my-blog/
├── content/           # Your TOML content files
│   ├── index.toml
│   └── hello-world.toml
├── templates/         # Your Liquid templates
│   ├── index.liquid
│   └── blog.liquid
└── dist-tmp/          # Generated HTML output (created automatically)
```

### Example Content (content/index.toml)

```toml
[config]
template = "index"  # Optional: specify which template to use

[header]
bio = "Welcome to my blog!"
```

### Example Template (templates/index.liquid)

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

dilate will render `index.toml` using `index.liquid` (or the specified template) and output `index.html` in the `dist-tmp/` directory.

## WIP

⚠️ Still in early development and things may change.

![](dilate.gif)
