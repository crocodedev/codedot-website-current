import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Navbar from 'src/containers/Navbar'
import Top from 'src/containers/Top'
import Footer from 'src/containers/Footer'
import * as Sections from 'src/containers/Sections'

import SEO from 'components/SEO'

import 'utils/fixFontAwesome'
import breakDownAllNodes from 'utils/breakDownAllNodes'
import fileNameToSectionName from 'utils/fileNameToSectionName'

import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import '../style/main.scss'

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        frontmatter {
          logo
          name
          title
          description
          keywords
          imageFileName
          anchor
          header
          subheader
          jumpToAnchor
          portfolios {
            imageFileName
            imageFileNameDetail
            header
            subheader
            content
            extraInfo
            date
          }
          technologies {
            imageFileName
            header
            href
          }
          content
          teamMember {
            imageFileName
            header
            subheader
            social {
              facebook
              github
              linkedin
              medium
              twitter
            }
          }
          skype
          telegram
          email
          address
          copyright
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`

const IndexPage = ({ data, pageContext }) => {
  const {
    allMarkdownRemark: { nodes },
  } = data
  const { langKey, defaultLang, langTextMap } = pageContext

  const { metaDataNote, navBarNode, topNode, sectionsNodes, footerNode, anchors } =
    breakDownAllNodes(nodes)

  return (
    <>
      <SEO lang={langKey} frontmatter={metaDataNote.frontmatter} />
      <Navbar
        logo={metaDataNote.frontmatter.logo}
        anchors={anchors}
        frontmatter={{
          langKey,
          defaultLang,
          langTextMap,
          ...navBarNode.frontmatter,
        }}
      />
      <Top frontmatter={topNode.frontmatter} />
      {sectionsNodes.map(({ frontmatter, fields: { fileName } }, ind) => {
        const sectionComponentName = fileNameToSectionName(fileName)
        const SectionComponent = Sections[sectionComponentName]

        return SectionComponent ? (
          <SectionComponent
            key={sectionComponentName}
            className={ind % 2 === 1 ? 'bg-light' : null}
            frontmatter={frontmatter}
            langKey={langKey}
          />
        ) : null
      })}
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.exact({
    defaultLang: PropTypes.string,
    langKey: PropTypes.string,
    langTextMap: PropTypes.object,
  }).isRequired,
}

export default IndexPage
