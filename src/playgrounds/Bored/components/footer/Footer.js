import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Button from '../form/button'
import useActivityCounter from '../../state/useActivityCounter'

import Styles from './Footer.css'

export default function Footer({ className }) {
  const [skippedLabel, clearSkipped] = useActivityCounter('skipped')
  const [doneLabel, clearDone] = useActivityCounter('done')

  function handlePageClick(e) {
    e.preventDefault()
    console.log("Let's stay here, just for demo purposes.")
  }

  return (
    <footer className={cx(Styles.footer, className)}>
      <ul>
        <li>
          <a
            href="/activities/skipped"
            className={cx(Styles.option, Styles.blocked)}
            onClick={handlePageClick}
          >
            Skipped ({skippedLabel})
          </a>
          {clearSkipped && (
            <Button variant="outline" size="xs" className={Styles.option} onClick={clearSkipped}>
              Clear
            </Button>
          )}
        </li>
        <li>
          <a
            href="/activities/done"
            className={cx(Styles.option, Styles.blocked)}
            onClick={handlePageClick}
          >
            Done ({doneLabel})
          </a>
          {clearDone && (
            <Button variant="outline" size="xs" className={Styles.option} onClick={clearDone}>
              Clear
            </Button>
          )}
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="https://www.boredapi.com/"
            target="_blank"
            rel="noreferrer"
            className={Styles.option}
          >
            Bored API
          </a>
        </li>
        <li>
          <a
            href="https://github.com/drewthoennes/Bored-API/blob/master/db/activities.json"
            target="_blank"
            rel="noreferrer"
            className={Styles.option}
          >
            Bored JSON
          </a>
        </li>
      </ul>
    </footer>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}
