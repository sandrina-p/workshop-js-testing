import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Link from '../link'
import Button from '../form/button'
import useBoredList from '../../state/useBoredList'

import Styles from './Footer.css'

function BoredLink(props) {
  return (
    <a target="_blank" rel="noreferrer" className={Styles.option} {...props} />
  )
}

export default function Footer({ className }) {
  const skipList = useBoredList('skipped')
  const doneList = useBoredList('done')

  function handlePageClick(e) {
    e.preventDefault()
    console.log("Let's stay here, just for demo purposes.")
  }

  return (
    <footer className={cx(Styles.footer, className)}>
      <ul>
        <li>
          <Link
            to="/activities/skipped"
            className={cx(Styles.option, Styles.blocked)}
            onClick={handlePageClick}
          >
            Skipped ({skipList.countLabel})
          </Link>
          {skipList.clear && (
            <Button
              variant="outline"
              size="xs"
              className={Styles.option}
              onClick={skipList.clear}
              aria-label="Clear skipped"
            >
              Clear
            </Button>
          )}
        </li>
        <li>
          <Link
            to="/activities/done"
            className={cx(Styles.option, Styles.blocked)}
            onClick={handlePageClick}
          >
            Done ({doneList.countLabel})
          </Link>
          {doneList.clear && (
            <Button
              variant="outline"
              size="xs"
              className={Styles.option}
              onClick={doneList.clear}
              aria-label="Clear done"
            >
              Clear
            </Button>
          )}
        </li>
      </ul>
      <ul>
        <li>
          <BoredLink href="https://www.boredapi.com/">Bored API</BoredLink>
        </li>
        <li>
          <BoredLink href="https://www.boredapi.com/">Bored DB</BoredLink>
        </li>
      </ul>
    </footer>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}
