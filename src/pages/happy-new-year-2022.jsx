import React from 'react'
// import HappyNewYear from 'components/HappyNewYear/HappyNewYear'

const HappyNewYearPage = () => {
  React.useEffect(() => {
    const replaceFrom = 'codedot.by'
    const replaceTo = 'codedot.io'
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    if (url.toLowerCase().includes(replaceFrom)) {
      window.location = url.replace(replaceFrom, replaceTo)
    }
  }, [])

  return null
}

export default HappyNewYearPage
