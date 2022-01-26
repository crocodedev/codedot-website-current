import { curry, pathSatisfies, test, identity, path } from 'ramda'

const propFilter = curry((pathList, regex) => pathSatisfies(test(regex), pathList))

/**
 * break down all data retrieved in index.js
 */
const breakDownAllNodes = (nodes) => {
  const filterByFileName = propFilter(['fields', 'fileName'])
  const filterByDirectoryName = propFilter(['fields', 'directoryName'])

  const metaDataNote = nodes.find(filterByFileName(/metadata/i)) || {}
  const topNode = nodes.find(filterByFileName(/top/i)) || {}
  const navBarNode = nodes.find(filterByFileName(/navbar/i)) || {}
  const footerNode = nodes.find(filterByFileName(/footer/i)) || {}

  const sectionsNodes = nodes.filter(filterByDirectoryName(/sections/i))

  // anchors for NavBar
  const anchors = sectionsNodes.map(path(['frontmatter', 'anchor'])).filter(identity)

  return {
    metaDataNote,
    topNode,
    navBarNode,
    footerNode,
    sectionsNodes,
    anchors,
  }
}

export default breakDownAllNodes
