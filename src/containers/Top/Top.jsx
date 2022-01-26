import React from 'react'
import PropTypes from 'prop-types'

import ImageCard from 'components/ImageCard'

const Top = ({ frontmatter }) => {
  if (!frontmatter) return null
  const { header, subheader, imageFileName, jumpToAnchor } = frontmatter

  return (
    <ImageCard
      imageFileName={imageFileName}
      header={header}
      subheader={subheader}
      jumpToAnchor={jumpToAnchor}
    />
  )
}

Top.propTypes = {
  frontmatter: PropTypes.object,
}

Top.defaultProps = {
  frontmatter: null,
}

export default Top
