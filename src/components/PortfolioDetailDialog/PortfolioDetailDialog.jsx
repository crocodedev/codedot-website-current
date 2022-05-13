import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import Image from 'components/Image'

const PortfolioDetailDialog = ({
  onHide,
  imageFileName,
  imageAlt,
  header,
  subheader,
  content,
  extraInfo,
  ...restProps
}) => (
  <Modal
    {...restProps}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton className="py-2">
      <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="p-0">
      <Image
        className="img-fluid d-block"
        fileName={imageFileName}
        alt={imageAlt || header || subheader}
      />
      {/* <p className="item-intro text-muted px-3 pt-3 mb-2">{subheader}</p> */}
      <p className="px-3 pt-3 mb-2">
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a className="custom-link" href={content} target="_blank">
          <span>
            {
              content
                .split('http')
                .join('')
                .split('s://')
                .join('')
                .split('://')
                .join('')
                .split('/')[0]
            }
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.6151 3.50355L6.1292 3.28348L6.15387 2.66859L12.5711 2.92603L12.8944 9.53518L12.2798 9.56525L12.0008 3.86276L3.44617 12.2511L3.07693 11.8757L3.07755 11.8751L11.6151 3.50355ZM11.8246 3.51196L11.984 3.51835L11.992 3.6821L11.8246 3.51196Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </p>
      {extraInfo}
    </Modal.Body>
  </Modal>
)

PortfolioDetailDialog.propTypes = {
  onHide: PropTypes.func,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
  extraInfo: PropTypes.any,
}

PortfolioDetailDialog.defaultProps = {
  onHide: null,
  imageFileName: '',
  imageAlt: null,
  header: '',
  subheader: '',
  content: '',
  extraInfo: null,
}

export default PortfolioDetailDialog
