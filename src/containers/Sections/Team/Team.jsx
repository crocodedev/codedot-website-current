import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

import TeamMember from 'components/TeamMember'
import SectionHeader from 'components/SectionHeader'
import PageSection from 'components/PageSection'

import './Team.scss'

const Team = ({ className, frontmatter }) => {
  if (!frontmatter) return null

  const {
    anchor,
    header: rootHeader,
    subheader: rootSubHeader,
    content: rootContent,
    teamMember,
  } = frontmatter

  return (
    <PageSection className={`mb-n5 ${className}`} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="justify-content-center">
        {teamMember.map(({ imageFileName, ...tmProps }) => (
          <Col sm={4} key={imageFileName}>
            <TeamMember imageFileName={imageFileName} {...tmProps} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={8} className="mx-auto text-center">
          <p className="large text-muted">{rootContent}</p>
        </Col>
      </Row>
    </PageSection>
  )
}

Team.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Team.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Team
