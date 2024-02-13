const path = require('path')
const getBaseUrl = require('./src/utils/getBaseUrl')

const {
  DEFAULT_LANG: defaultLang = 'en',
  LANG_TEXT_MAP: langTextMap = '{"en":"English","ru":"Русский","de":"Deutsch"}',
  MAP_CENTER: mapCenter = '[55.157916, 30.214336]',
  ACCESS_TOKEN: accessToken,
} = process.env

/**
 * add fileName to node for markdown files
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const fileName = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'fileName',
      value: fileName,
    })

    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    })
  }
}

/**
 * define nullable items
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    'type MarkdownRemark implements Node { frontmatter: Frontmatter }',
    `type Frontmatter {
      anchor: String
      social: Social
      services: [Service]
      teamMember: [TeamMember]
    }`,
    `type TeamMember {
      social: Social
    }`,
    `type Service {
      iconName: String
      imageFileName: String
      header: String
      content: String
    }`,
    `
    type Social {
      twitter: String
      facebook: String
      linkedin: String
      medium: String
      github: String
    }
    `,
  ]

  createTypes(typeDefs)
}

/**
 * generate i18n pages
 */
exports.createPages = ({ graphql, actions: { createPage } }) => {
  const index = path.resolve('./src/templates/index.jsx')
  const notFound = path.resolve('./src/templates/404.jsx')

  createPage({
    path: `/404`,
    component: notFound,
    context: {
      langTextMap: JSON.parse(langTextMap),
      defaultLang,
    },
  })

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              distinct(field: fields___langKey)
            }
          }
        `,
      ).then(({ errors, data }) => {
        if (errors) {
          // eslint-disable-next-line no-console
          console.log(errors)
          reject(errors)
        }

        data.allMarkdownRemark.distinct.forEach((langKey) => {
          createPage({
            path: getBaseUrl(defaultLang, langKey),
            component: index,
            context: {
              langKey,
              defaultLang,
              langTextMap: JSON.parse(langTextMap),
              mapCenter: JSON.parse(mapCenter),
              accessToken,
            },
          })
        })

        return null
      }),
    )
  })
}
