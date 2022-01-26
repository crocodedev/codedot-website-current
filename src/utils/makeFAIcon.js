import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// eslint-disable-next-line react/display-name
const makeFAIcon = (icon) => (props) => <FontAwesomeIcon icon={icon} {...props} />

export default makeFAIcon
