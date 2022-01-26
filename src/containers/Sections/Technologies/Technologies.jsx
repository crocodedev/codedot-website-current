import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Row } from 'react-bootstrap'
import Slider from 'react-slick'

import PageSection from 'components/PageSection'
import SectionHeader from 'components/SectionHeader'
import Technology from 'components/Technology/Technology'

import './Technologies.scss'

const Technologies = ({ className, frontmatter }) => {
  if (!frontmatter) return null

  const { anchor, header: rootHeader, subheader: rootSubHeader, technologies } = frontmatter

  const dynamicSlidesToShow = (num = 9, quantity = technologies.length) =>
    quantity < num ? quantity : num

  const settings = {
    infinite: true,
    slidesToShow: dynamicSlidesToShow(9),
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',

    responsive: [
      {
        breakpoint: 1067,
        settings: {
          slidesToShow: dynamicSlidesToShow(8),
        },
      },
      {
        breakpoint: 954,
        settings: {
          slidesToShow: dynamicSlidesToShow(7),
        },
      },
      {
        breakpoint: 821,
        settings: {
          slidesToShow: dynamicSlidesToShow(6),
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: dynamicSlidesToShow(5),
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: dynamicSlidesToShow(4),
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: dynamicSlidesToShow(3),
          rows: 2,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: dynamicSlidesToShow(2),
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  }

  return (
    <>
      <PageSection fluid={true} className={clsx('tech px-0', className)} id={anchor}>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
        <Row className="overflow-hidden">
          <Slider className="tech-slider" {...settings}>
            {technologies.map(({ href, imageFileName, header }) => (
              <Technology
                key={imageFileName}
                href={href}
                imageFileName={imageFileName}
                header={header}
              />
            ))}
          </Slider>
        </Row>
      </PageSection>
    </>
  )
}

Technologies.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Technologies.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Technologies
