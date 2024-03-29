import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'

import Image from 'components/Image'
import PortfolioDetailDialog from 'components/PortfolioDetailDialog'

import './PortfolioItem.scss'

const PortfolioItem = ({
  imageFileName,
  imageAlt,
  header,
  subheader,
  content,
  imageFileNameDetail,
  imageAltDetail,
  extraInfo,
}) => {
  const [showDetail, setShowDetail] = React.useState(false)
  const handleShowDetail = React.useCallback(() => {
    setShowDetail(true)
  }, [])
  const handleHideDetail = React.useCallback(() => {
    setShowDetail(false)
  }, [])

  return (
    <>
      <Col md={4} sm={6} className="portfolio-item">
        <a
          role="button"
          tabIndex={-1}
          className="portfolio-link"
          data-toggle="modal"
          onClick={handleShowDetail}
        >
          <Image
            className="img-fluid w-100"
            fileName={imageFileName}
            alt={imageAlt || header || subheader}
          />
          <div className="portfolio-caption">
            <h4>{header}</h4>
            {subheader ? <p className="text-muted">{subheader}</p> : null}
          </div>
        </a>
      </Col>
      <PortfolioDetailDialog
        show={showDetail}
        onHide={handleHideDetail}
        imageFileName={imageFileNameDetail || imageFileName}
        imageAlt={imageAltDetail || imageAlt}
        header={header}
        subheader={subheader}
        content={content}
        extraInfo={extraInfo}
      />
    </>
  )
}

PortfolioItem.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  content: PropTypes.string,
  imageFileNameDetail: PropTypes.string,
  imageAltDetail: PropTypes.string,
  extraInfo: PropTypes.any,
}

PortfolioItem.defaultProps = {
  imageAlt: '',
  subheader: '',
  content: '',
  imageFileNameDetail: '',
  imageAltDetail: '',
  extraInfo: null,
}

export default PortfolioItem
