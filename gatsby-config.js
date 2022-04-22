// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')

const {
  DEFAULT_LANG: defaultLang,
  SITE_ENVIRONMENT: siteEnvironment,
  GATSBY_NAME: name,
} = process.env

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name,
        short_name: name,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#222222',
        display: 'minimal-ui',
        icon: `content-${siteEnvironment}/assets/icon.svg`,
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
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: `@import "core.scss";`,
        includePaths: [path.resolve(__dirname, 'src/style')],
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-217807340-1',
      },
    },
  ],
}
