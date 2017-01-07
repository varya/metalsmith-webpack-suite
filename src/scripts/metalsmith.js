import Metalsmith from 'metalsmith'
import watch from 'metalsmith-watch'
import markdown from 'metalsmith-markdownit'
import assets from 'metalsmith-assets'
import copy from 'metalsmith-copy'
import collections from 'metalsmith-collections'
import metadata from 'metalsmith-collection-metadata'
import mPaths from 'metalsmith-paths'
import permalinks from 'metalsmith-permalinks'
import snippet from 'metalsmith-snippet'
import reactTemplates from 'metalsmith-react-templates'

import paths from '../config/paths'

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const devOnly = (plugin, config) => {
  return __DEV__ ? plugin(config) : (files, metalsmith, done) => {
    done()
  }
}

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(copy({
    pattern: '**/*.md',
    move: true,
    transform: f => {
      if (f.match(/index_en.md/i)) {
        return f.replace('_en.md', '.md');
      }
      if (f.match(/^.*_en.md/i)) {
        return 'en/' + f.replace('_en.md', '.md');
      }
      if (f.match(/^.*_ru.md/i)) {
        return 'ru/' + f.replace('_ru.md', '.md');
      }
      //console.log('returned', f);
    }

  }))
  .use(devOnly(watch, {
    livereload: true,
    invalidateCache: true
  }))
  .use(collections({
    posts_en: {
      pattern: ['posts/**/*.md', '!posts/index.md'],
      sortBy: 'date',
      reverse: true
    },
    posts_ru: {
      pattern: ['ru/posts/**/*.md', '!ru/posts/index.md'],
      sortBy: 'date',
      reverse: true
    },
    life_en: {
      pattern: ['life/**/*.md', '!life/index.md'],
      sortBy: 'date',
      reverse: true
    },
    life_ru: {
      pattern: ['ru/life/**/*.md', '!ru/life/index.md'],
      sortBy: 'date',
      reverse: true
    },
    pages_en: {
      pattern: ['*.md', '*/*.md', '!ru/**/*.md'],
      sortBy: 'order',
    },
    pages_ru: {
      pattern: ['ru/*.md', 'ru/*/*.md'],
      sortBy: 'order',
    },
    en: {
      pattern: ['**/*.md', '!ru/**/*.md']
    },
    ru: {
      pattern: ['ru/**/*.md']
    }
  }))
  .use(metadata({
    'collections.en': {
      lang: 'en',
      texts: require('../config/texts')('en')
    },
    'collections.ru': {
      lang: 'ru',
      texts: require('../config/texts')('ru')
    },
    'collections.posts_en': {
      rtemplate: 'Post.js'
    },
    'collections.posts_ru': {
      rtemplate: 'Post.js'
    }
  }))
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))
  .use(mPaths({
    property: "paths"
  }))
  .use(markdown({
    html: true
  }))
  .use(snippet({
    stop: ['<excerpt/>'],
    stripHtml: false,
    suffix: ''
  }))
  .use(reactTemplates({
    babel: true,
    directory: 'src/templates',
    baseFile: 'base.html',
    defaultTemplate: 'Default.js',
    extension: null,
    static: true
  }))
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  // Inject webpack bundles into your html.
  // Relies on <!-- assets-head --> & <!-- assets-body --> placeholders.
  .use((files, metalsmith, done) => {
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())

    const assetsHead = []
    if (assets.hasOwnProperty('loader')) {
      assetsHead.push(`<script src="${assets.loader.js}"></script>`)
      delete assets.loader
    }

    if (assets.hasOwnProperty('styles')) {
      if (assets.styles.hasOwnProperty('css')) {
        assetsHead.push(`<link rel="stylesheet" href="${assets.styles.css}"/>`)
      } else {
        assetsHead.push(`<script src="${assets.styles.js}"></script>`)
      }

      delete assets.styles
    }

    assetsHead.push(`<script src="${assets.head.js}"></script>`)
    delete assets.head

    const assetsBody = Object.keys(assets).map((asset) => {
      return `<script src="${assets[asset].js}"></script>`
    })

    if (__DEV__) {
      assetsBody.push('<script src="http://localhost:35729/livereload.js"></script>')
    }

    for (let fileName in files) {
      const file = files[fileName]
      const html = file.contents.toString()
        .replace('<!-- assets-head -->', assetsHead.join('\n'))
        .replace('<!-- assets-body -->', assetsBody.join('\n'))

      file.contents = new Buffer(html)
    }

    done()
  })
