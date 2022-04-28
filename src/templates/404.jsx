import React from 'react'
import { navigate } from 'gatsby'
import getBaseUrl from 'utils/getBaseUrl'

const NotFoundPage = ({ location: { pathname }, pageContext: { langTextMap, defaultLang } }) => {
  React.useEffect(() => {
    const lang =
      Object.keys(langTextMap).find((key) => `/${key}/` === pathname.slice(0, 4)) || defaultLang
    navigate(`${getBaseUrl(defaultLang, lang)}`)
  }, [defaultLang, langTextMap, pathname])

  return null
}

export default NotFoundPage
