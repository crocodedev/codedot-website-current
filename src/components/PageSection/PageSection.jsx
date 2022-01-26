import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Container } from 'react-bootstrap'

import './PageSection.scss'

const PageSection = ({ children, className, fluid, ...restProps }) => (
  <section className={clsx('page-section', className)} {...restProps}>
    <Container fluid={fluid}>{children}</Container>
  </section>
)

PageSection.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  fluid: PropTypes.bool,
}

PageSection.defaultProps = {
  children: null,
  className: null,
  fluid: false,
}

export default PageSection
