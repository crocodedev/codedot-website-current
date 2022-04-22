import React from 'react'
import PropTypes from 'prop-types'

import './Technology.scss'

// eslint-disable-next-line react/prop-types
const Technology = ({ imageFileName, header, href }) => {
  const imgPart = (
    <div className="tech-wrap-img">
      <img className="tech-img" src={imageFileName} alt="" loading="lazy" />
    </div>
  )

  if (href) {
    return (
      <a className="tech-item" href={href} target="_blank" rel="noopener noreferrer">
        {imgPart}
        <p className="text-center">{header}</p>
      </a>
    )
  }

  return imgPart
}

Technology.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  href: PropTypes.string,
}

Technology.defaultProps = {
  href: null,
}

export default Technology
