// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')

const {
  DEFAULT_LANG: defaultLang = 'en',
  SITE_ENVIRONMENT: siteEnvironment = '',
  GATSBY_NAME: name = 'SITE',
  GOOGLE_ANALYTICS_TRACKING_ID: trackingId = 'UA-119418003-5',
} = process.env

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId,
        head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name,
        short_name: name,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#222222',
        display: `standalone`,
        icon: `content-${siteEnvironment}/assets/icon.svg`,
        legacy: false,
        cache_busting_mode: 'none',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/content-${siteEnvironment}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content-${siteEnvironment}/assets/images`,
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [480, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false,
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icon*'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@import "core.scss";`,
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/style')],
        },
      },
    },
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        preconnect: ['https://fonts.gstatic.com'],
        web: [
          {
            name: 'Comfortaa',
            file: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: defaultLang,
        useLangKeyLayout: false,
        pagesPaths: [`/content-${siteEnvironment}/`],
      },
    },
    'gatsby-plugin-netlify',
  ],
  flags: {
    FAST_DEV: false, // Enable all experiments aimed at improving develop server start time
    DEV_SSR: false, // (Umbrella Issue (https://gatsby.dev/dev-ssr-feedback)) · Server Side Render (SSR) pages on full reloads during develop. Helps you detect SSR bugs and fix them without needing to do full builds. See umbrella issue for how to update custom webpack config
    PRESERVE_FILE_DOWNLOAD_CACHE: false, // (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Don't delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.
    PARALLEL_SOURCING: false, // EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/parallel-sourcing-feedback)) · Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably
  },
}
