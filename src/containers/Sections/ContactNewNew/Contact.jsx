import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'
import Map from 'react-map-gl';

import PageSection from 'components/PageSection'

import 'mapbox-gl/dist/mapbox-gl.css';
import './Contact.scss'

const Contact = ({ className, frontmatter, langKey }) => {
  if (!frontmatter) return null
  const { anchor, header, skype, telegram, email, address } = frontmatter

  const mapboxAccessToken = "pk.eyJ1IjoiYXNwaXJpbi12ZCIsImEiOiJja2d5MjdoczkwOWJ5MnpxdmVhZjVqeGdkIn0.xRipdCN-W4AKwYZQGx4Ovg"
  return (
    <PageSection className={`py-0 px-0 ${className}`} id={anchor} fluid={true}>
      <Row className="contact-map">
        <Map
          mapboxAccessToken={mapboxAccessToken}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
          }}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </Row>
    </PageSection>
  )
}

Contact.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
  langKey: PropTypes.string,
}

Contact.defaultProps = {
  className: null,
  frontmatter: null,
  langKey: 'en',
}

export default Contact
