import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const SEO = ({ lang, frontmatter }) => {
  const { name, title, description, keywords } = frontmatter

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `/icons/icon-512x512.png`,
        },
        {
          property: `og:site_name`,
          content: name,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : [],
      )}
    >
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEC_I2udQ.woff2"
        as="font"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEL_I2udQ.woff2"
        as="font"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEM_I2udQ.woff2"
        as="font"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEA_I2udQ.woff2"
        as="font"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEB_I2udQ.woff2"
        as="font"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/comfortaa/v34/1PtCg8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMXL830efAesmwYSFoxBEP_I0.woff2"
        as="font"
        crossOrigin
      />
    </Helmet>
  )
}

SEO.propTypes = {
  lang: PropTypes.string,
  frontmatter: PropTypes.object,
}

SEO.defaultProps = {
  lang: 'en',
  frontmatter: {
    title: '',
    description: '',
    keywords: [],
    author: '',
  },
}

export default SEO
