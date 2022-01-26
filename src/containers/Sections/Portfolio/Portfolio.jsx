import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Row } from "react-bootstrap";

import SectionHeader from 'components/SectionHeader'
import PortfolioItem from 'components/PortfolioItem'
import PageSection from 'components/PageSection'

import './Portfolio.scss'
import nl2br from "utils/nl2br";

// eslint-disable-next-line react/prop-types
const Portfolio = ({ className, frontmatter, langKey }) => {
  if (!frontmatter) return null
  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter

  return (
    <PageSection className={clsx('portfolio-section', className)} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        {portfolios.map(
          ({ content, extraInfo, header, imageFileName, imageFileNameDetail, subheader, date }) => (
            <PortfolioItem
              key={header}
              imageFileName={imageFileName}
              header={header}
              subheader={subheader}
              content={content}
              imageFileNameDetail={imageFileNameDetail}
              extraInfo={
                <>
                  <p className="px-3 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: nl2br(extraInfo),
                    }}
                  />
                  <p className="px-3 portfolio-date">{
                    new Intl.DateTimeFormat(langKey, { year: 'numeric', month: 'long'}).format(Date.parse(`01/${date}`))
                  }</p>
                </>
              }
            />
          ),
        )}
      </Row>
    </PageSection>
  )
}

Portfolio.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Portfolio.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Portfolio
