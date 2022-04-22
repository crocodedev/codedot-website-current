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
