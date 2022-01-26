import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ fileName, alt, ...restProps }) => {
  const { images } = useStaticQuery(graphql`
    query ImageQuery {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              sizes(maxWidth: 1920) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  `)

  const image = images.edges.find((n) => n.node.relativePath.includes(fileName))

  if (!image) return null

  const imageSizes = image.node.childImageSharp.sizes
  return <Img alt={alt} sizes={imageSizes} {...restProps} loading="lazy" />
}

Image.propTypes = {
  fileName: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

Image.defaultProps = {
  alt: null,
}

export default Image
