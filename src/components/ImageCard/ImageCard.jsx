import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Container, Card } from 'react-bootstrap'

import Image from 'components/Image'

import './ImageCard.scss'
import { Link } from 'react-scroll'

const ImageCard = ({ className, imageFileName, imageAlt, header, subheader, jumpToAnchor }) => {
  const [arrow, setArrow] = useState(true)
  return (
    <Card className={clsx('image-card bg-dark text-white position-relative', className)}>
      <Image className="image" fileName={imageFileName} alt={imageAlt || header || subheader} />
      <Card.ImgOverlay className="no-padding">
        <Container className="pb-5">
          <div className="intro-text">
            <div className="intro-heading text-uppercase">{header}</div>
            <div
              className="intro-lead-in"
              dangerouslySetInnerHTML={{
                __html: subheader,
              }}
            />
          </div>
        </Container>
      </Card.ImgOverlay>
      <div className="text-center arrow-icon">
        <Link
          className={arrow ? '' : 'hidden'}
          to={jumpToAnchor}
          spy
          smooth="easeInOutQuart"
          onClick={() => setArrow(false)}
        >
          <span />
          <span />
          <span />
        </Link>
      </div>
    </Card>
  )
}

ImageCard.propTypes = {
  className: PropTypes.string,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  jumpToAnchor: PropTypes.string,
}

ImageCard.defaultProps = {
  className: null,
  imageFileName: null,
  imageAlt: null,
  header: '',
  subheader: '',
  jumpToAnchor: '',
}

export default ImageCard
