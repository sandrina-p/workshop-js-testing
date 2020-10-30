import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useRoute } from 'wouter'

import '../utils/vendor/prism.js'
import '../utils/vendor/prism.css'

import 'normalize.css'

import './theme.css'

import Styles from './index.css'

export default function Root() {
  return (
    <div className={Styles.credits}>
      <div>
        <p>
          Made without coffee by{' '}
          <a className={Styles.link} href="https://sandrina-p.net">
            Sandrina Pereira
          </a>
          <span>© 2020 All rights reserved.</span>
        </p>
      </div>
      <h3 className="sr-only" id="socialStuff">
        Social Networks
      </h3>
      <nav aria-labelledby="socialStuff">
        <ul className={Styles.social}>
          <li>
            <a
              className={Styles.link}
              href="http://codepen.io/sandrina-p"
              rel="noreferrer"
            >
              codepen
            </a>
          </li>
          <li>
            <a
              className={Styles.link}
              href="http://twitter.com/a_sandrina_p"
              rel="noreferrer"
            >
              twitter
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
