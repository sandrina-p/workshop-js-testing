import React from 'react'
import { useLocation, useRoute } from 'wouter'

import 'normalize.css'
import './theme.css'
import Styles from './index.css'

import briefings from '../utils/briefingsMd'
import { linkTo } from '../utils'

import Home from '../pages/Home'
import Briefing from '../pages/Briefing'

console.log(Styles)

export default function Root() {
  const [, setLocation] = useLocation()
  const [matchHome] = useRoute('/')
  const [matchBriefing] = useRoute('/briefings/:id')

  return (
    <div className={Styles.shell}>
      <header className={Styles.sidebar}>
        <nav>
          <ul>
            <li>
              <a {...linkTo(setLocation, '/')}>Home</a>
            </li>
            {Object.keys(briefings).map(id => (
              <li key={id}>
                <a {...linkTo(setLocation, `/briefings/${id}`)}>Briefing {id}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className={Styles.area}>
        <main className={Styles.content}>
          {matchHome && <Home />}
          {matchBriefing && <Briefing />}
          {!matchHome && !matchBriefing && (
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
