import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactMapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl'
import { useInView } from 'react-intersection-observer'

import PageSection from 'components/PageSection'
import nl2br from 'utils/nl2br'

import './Contact.scss'

const Contact = ({ className, frontmatter, mapCenter, accessToken }) => {
  const [hasMounted, setHasMounted] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: mapCenter[0],
    longitude: mapCenter[1],
    zoom: 4,
    bearing: 0,
    pitch: 50,
  })
  const [settings] = useState({
    touchAction: 'pan-y',
    dragPan: false,
    scrollZoom: false,
    dragging: false,
    scrollWheelZoom: false,
    keyboard: false,
    minZoom: 3,
    maxZoom: 17,
    minPitch: 0,
    maxPitch: 71,
  })
  const [popupInfo, setPopupInfo] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (!hasMounted && inView) {
      setHasMounted(true)
    }
  }, [hasMounted, inView])

  if (!frontmatter) return null
  const { anchor, header, skype, telegram, email, address } = frontmatter

  const onClickMarker = () => {
    setPopupInfo(!popupInfo)
  }

  return (
    <PageSection className={`${className} contact py-0`} id={anchor} fluid={true}>
      <div className="contact-map" ref={ref}>
        {hasMounted && (
          <ReactMapGL
            {...viewport}
            {...settings}
            width="100%"
            height="100%"
            mapboxApiAccessToken={accessToken}
            onViewportChange={(e) => setViewport(e)}
            mapStyle="mapbox://styles/mapbox/light-v9"
          >
            <div className="contact-fullscreen">
              <FullscreenControl className="position-relative" />
            </div>
            <div className="contact-nav">
              <NavigationControl className="position-relative" />
            </div>
            <Marker
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              offsetLeft={-40}
              offsetTop={-80}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 512 512"
                className="svg-color"
                style={{
                  cursor: 'pointer',
                  fill: 'currentColor',
                  stroke: 'none',
                }}
                onClick={onClickMarker}
              >
                <path d="M256,32C167.67,32,96,96.51,96,176c0,128,160,304,160,304S416,304,416,176C416,96.51,344.33,32,256,32Zm0,224a64,64,0,1,1,64-64A64.07,64.07,0,0,1,256,256Z" />
              </svg>

              <div className={`popup-custom ${popupInfo && 'd-none'}`}>
                <div
                  className="close"
                  onClick={onClickMarker}
                  role="button"
                  tabIndex="0"
                  aria-label="Close"
                />
                <div className="contact-info">
                  <div className="contact-body">
                    <div>
                      <h5 className="text-uppercase">{header}</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="skype"
                        className="svg-inline--fa fa-skype fa-w-14 me-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"
                        />
                      </svg>
                      <a className="custom-link" href={`skype:${skype}?chat`}>
                        <span>{skype}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6151 3.50355L6.1292 3.28348L6.15387 2.66859L12.5711 2.92603L12.8944 9.53518L12.2798 9.56525L12.0008 3.86276L3.44617 12.2511L3.07693 11.8757L3.07755 11.8751L11.6151 3.50355ZM11.8246 3.51196L11.984 3.51835L11.992 3.6821L11.8246 3.51196Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="telegram-plane"
                        className="svg-inline--fa fa-telegram-plane fa-w-14 me-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
                        />
                      </svg>
                      <a className="custom-link" href={`tg://resolve?domain=:${telegram}`}>
                        <span>@{telegram}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6151 3.50355L6.1292 3.28348L6.15387 2.66859L12.5711 2.92603L12.8944 9.53518L12.2798 9.56525L12.0008 3.86276L3.44617 12.2511L3.07693 11.8757L3.07755 11.8751L11.6151 3.50355ZM11.8246 3.51196L11.984 3.51835L11.992 3.6821L11.8246 3.51196Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="envelope"
                        className="svg-inline--fa fa-envelope fa-w-16 me-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                        />
                      </svg>
                      <a className="custom-link" href={`mailto:${email}`}>
                        <span>{email}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6151 3.50355L6.1292 3.28348L6.15387 2.66859L12.5711 2.92603L12.8944 9.53518L12.2798 9.56525L12.0008 3.86276L3.44617 12.2511L3.07693 11.8757L3.07755 11.8751L11.6151 3.50355ZM11.8246 3.51196L11.984 3.51835L11.992 3.6821L11.8246 3.51196Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="building"
                        className="svg-inline--fa fa-building fa-w-14 me-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"
                        />
                      </svg>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: nl2br(address),
                        }}
                      />
                    </div>
                  </div>
                  <div className="balloon" />
                </div>
              </div>
            </Marker>
          </ReactMapGL>
        )}
      </div>
    </PageSection>
  )
}

Contact.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
  langKey: PropTypes.string,
  mapCenter: PropTypes.array,
  accessToken: PropTypes.string,
}

Contact.defaultProps = {
  className: null,
  frontmatter: null,
  langKey: 'en',
  mapCenter: [],
  accessToken: '',
}

export default Contact
