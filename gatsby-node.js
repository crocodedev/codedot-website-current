// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')
const getBaseUrl = require('./src/utils/getBaseUrl')

const { DEFAULT_LANG: defaultLang, LANG_TEXT_MAP: langTextMap } = process.env

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
            },
          })
        })

        return null
      }),
    )
  })
}
