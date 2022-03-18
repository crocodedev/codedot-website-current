import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = ({ frontmatter }) => {
  if (!frontmatter) return null
  const { copyright } = frontmatter

  return (
    <footer className="footer py-3">
      <Container>
        <Row className="align-items-center text-center">
          <Col className="w-100">
            © {new Date().getFullYear()} {copyright}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  frontmatter: PropTypes.object,
}

Footer.defaultProps = {
  frontmatter: null,
}

export default Footer
