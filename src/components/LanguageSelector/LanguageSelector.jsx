import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Link } from 'gatsby'
import { NavDropdown } from 'react-bootstrap'

import IconText from 'components/IconText'
import getBaseUrl from 'utils/getBaseUrl'

import './LanguageSelector.scss'

const LanguageSelector = ({ defaultLang, langKey, langTextMap }) => {
  const [langTextMapNew, setlangTextMapNew] = useState({})
  console.log(langTextMap)
  useEffect(() => {
    const filteredLangTextMap = {}

    for (const key in langTextMap) {
      if (key !== 'uk') {
        filteredLangTextMap[key] = langTextMap[key]
      }
    }
    setlangTextMapNew(filteredLangTextMap)
  }, [langTextMap])

  if (langTextMap != null && Object.keys(langTextMap).length > 1)
    return (
      <NavDropdown
        title={<IconText iconName="LanguageIcon" text={langKey} />}
        id="language-dropdown"
        className="language-selector"
      >
        {Object.keys(langTextMapNew).map((key) => (
          <Link
            key={key}
            to={getBaseUrl(defaultLang, key)}
            className={clsx('dropdown-item', { active: key === langKey })}
          >
            {langTextMap[key]}
          </Link>
        ))}
      </NavDropdown>
    )

  return null
}

LanguageSelector.propTypes = {
  defaultLang: PropTypes.string,
  langKey: PropTypes.string,
  langTextMap: PropTypes.object,
}

LanguageSelector.defaultProps = {
  defaultLang: 'en',
  langKey: 'en',
  langTextMap: {
    en: 'English',
  },
}

export default LanguageSelector
