import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/Icon'

import './IconText.scss'

const IconText = ({ iconName, text }) => (
  <span className="icon-text">
    <Icon className="icon" iconName={iconName} />
    <span className="text-uppercase">{text}</span>
  </span>
)

IconText.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default IconText
