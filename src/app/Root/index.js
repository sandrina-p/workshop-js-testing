import React from 'react'
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

export default function Root() {
  const [, setLocation] = useLocation()
  const [matchHome] = useRoute('/')
  const [matchBriefing] = useRoute('/briefings/:id')
  const [matchPlayground] = useRoute('/playgrounds/:id')
  const isNotFound = !matchHome && !matchBriefing && !matchPlayground

  return (
    <div className={Styles.shell}>
      <div className={Styles.sidebar}>
        <header className={Styles.sidebarInner}>
          <nav>
            <ul>
              <li>
                <a {...linkTo(setLocation, '/')}>Home</a>
              </li>
              {Object.keys(briefings).map(id => (
                <li key={id}>
                  <a {...linkTo(setLocation, `/briefings/${id}`)}>
                    Briefing {id}
                  </a>
                </li>
              ))}
              <li>
                <a {...linkTo(setLocation, '/playgrounds/boredapp')}>
                  Bored App
                </a>
              </li>
            </ul>
          </nav>
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
              Go back <a {...linkTo(setLocation, '/')}>home</a>.
            </>
          )}
        </main>
      </div>
    </div>
  )
}
