import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useRoute } from 'wouter'

import '../utils/vendor/prism.js'
import '../utils/vendor/prism.css'

import 'normalize.css'

import './theme.css'

import Styles from './index.css'

import briefings from '../data/briefings'
import { linkTo } from '../utils'

import Home from '../pages/home'
import Briefing from '../pages/briefing'
import Playground from '../pages/playground'

import Credits from './Credits'

function Link({ children, href, ...otherProps }) {
  const [, setLocation] = useLocation()
  const [isActive] = useRoute(href)

  return (
    <a
      {...linkTo(setLocation, href)}
      aria-current={isActive ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

export default function Root() {
  const [matchHome] = useRoute('/')
  const [matchBriefing] = useRoute('/briefings/:id')
  const [matchPlayground] = useRoute('/playgrounds/:id')
  const isNotFound = !matchHome && !matchBriefing && !matchPlayground

  const briefingsIds = Object.keys(briefings)
  const sectionOne = briefingsIds.filter(id => id.includes('1.'))
  const sectionTwo = briefingsIds.filter(id => id.includes('2.'))
  const navigation = [
    { title: 'Jest', briefings: sectionOne },
    { title: 'Testing Library', briefings: sectionTwo },
  ]
  return (
    <div className={Styles.shell}>
      <div className={Styles.sidebar}>
        <header className={Styles.sidebarInner}>
          <nav className={Styles.nav}>
            <Link href="/">Introduction</Link>

            {navigation.map(section => (
              <div className={Styles.navSection} key={section.title}>
                <p className={Styles.navTitle}>{section.title}</p>
                <ol key={section.title}>
                  {section.briefings.map(id => (
                    <li key={id}>
                      <Link href={`/briefings/${id}`}>
                        {briefings[id].name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            <Link href="/playgrounds/boredapp" className={Styles.navPG}>
              Playground
            </Link>

            {/* <Link href="/briefings/last">Going further...</Link> */}
          </nav>

          <Credits />
        </header>
      </div>
      <div className={Styles.area}>
        <main className={Styles.content}>
          {matchHome && <Home />}
          {matchBriefing && <Briefing />}
          {matchPlayground && <Playground />}

          {isNotFound && (
            <>
              <h1>You travelled too far.</h1>
              Go back <Link href="/">home</Link>.
            </>
          )}
        </main>
      </div>
    </div>
  )
}
