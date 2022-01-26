import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'
import * as SocialIcons from 'components/SocialIcons'

import './TeamMember.scss'

const TeamMember = ({
  imageFileName,
  imageAlt,
  header,
  subheader,
  // eslint-disable-next-line no-unused-vars
  social: { twitter, facebook, github, medium },
}) => {
  const twitterPart = twitter ? <SocialIcons.Twitter userName={twitter} /> : null
  const facebookPart = facebook ? <SocialIcons.Facebook userName={facebook} /> : null

  const githubPart = github ? <SocialIcons.Github userName={github} /> : null
  const mediumPart = medium ? <SocialIcons.Medium userName={medium} /> : null

  return (
    <div className="team-member">
      <Image
        className="mx-auto mx-sm-n4 mx-md-auto circle rounded-circle"
        fileName={imageFileName}
        alt={imageAlt || header || subheader}
      />
      <h4>{header}</h4>
      <p className="text-muted">{subheader}</p>
      <div>
        {twitterPart}
        {facebookPart}
        {githubPart}
        {mediumPart}
      </div>
    </div>
  )
}

TeamMember.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  social: PropTypes.shape({
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
    medium: PropTypes.string,
  }),
}

TeamMember.defaultProps = {
  imageAlt: null,
  header: '',
  subheader: '',
  social: {
    twitter: null,
    facebook: null,
    linkedin: null,
    github: null,
    medium: null,
  },
}

export default TeamMember
