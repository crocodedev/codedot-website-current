import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Navbar, Container, Nav } from 'react-bootstrap'

import useWindowOnScroll from 'hooks/useWindowOnScroll'
import useSmoothScrollTo from 'hooks/useSmoothScrollTo'

import LanguageSelector from 'components/LanguageSelector'
import Icon from 'components/Icon'
import NavItem from 'components/NavItem'

import Logo from '../../../content/assets/images/logo.svg'

import './Navbar.scss'

const MyNavbar = ({ anchors, frontmatter }) => {
  const { langKey, defaultLang, langTextMap } = frontmatter

  const handleScrollToTop = useSmoothScrollTo(0)
  const [expanded, setExpanded] = useState(false)
  const toggleMenu = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])
  const closeMenu = useCallback(() => {
    setExpanded(false)
  }, [])
  const handleBrandClick = useCallback(() => {
    closeMenu()
    handleScrollToTop()
  }, [closeMenu, handleScrollToTop])

  const [shrink, setShrink] = useState(false)
  const handleWindowScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setShrink(scrollTop > 100)
  }, [])
  useWindowOnScroll(handleWindowScroll)

  return (
    <Navbar
      className={clsx('navbar-root', { 'navbar-shrink': shrink })}
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={handleBrandClick}>
          <Logo />
        </Navbar.Brand>
        <div className="d-flex order-lg-1">
          <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
          <Navbar.Toggle onClick={toggleMenu} aria-label="Toggle navigation">
            <Icon iconName="BarsIcon" />
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse>
          <Nav className="text-uppercase ml-auto text-center">
            {anchors.map((anchor) => (
              <NavItem key={anchor} to={anchor} onClick={closeMenu} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

MyNavbar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.string),
  frontmatter: PropTypes.object,
}

MyNavbar.defaultProps = {
  anchors: [],
  frontmatter: {
    defaultLang: 'en',
    langKey: 'en',
    langTextMap: {
      en: 'English',
    },
  },
}

export default MyNavbar
