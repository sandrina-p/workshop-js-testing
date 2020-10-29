import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { getSinguralOrPlural } from '../../../utils/general'
import Button from '../form/button'

import Styles from './ActivityCard.css'

export default function ActivityCard({
  className,
  title,
  participants,
  href,
  category,
  isFree,
  onSkip,
  onDone,
  ...props
}) {
  const TitleTag = href ? 'a' : 'p'
  const titleAttrs = {
    ...(href ? { href, target: '_blank' } : {}),
  }

  return (
    <article className={cx(Styles.wrapper, className)} {...props}>
      <div className={Styles.kicker}>
        <p className={Styles.category}>{category}</p>
        <p className={Styles.description}>
          For {participants}{' '}
          {getSinguralOrPlural(participants, 'person', 'people')}
          {isFree ? (
            <>
              {' '}
              and <strong>{"it's free!"}</strong>
            </>
          ) : (
            '.'
          )}
        </p>
      </div>
      <TitleTag className={Styles.title} {...titleAttrs}>
        {title}
      </TitleTag>
      <div>
        <div className={Styles.ctas}>
          {onSkip && (
            <Button
              variant="outline"
              className={Styles.dismissBtn}
              onClick={onSkip}
              icon="😴"
              aria-label="Nah, that's boring"
            />
          )}
          {onDone && (
            <Button
              variant="outline"
              className={Styles.dismissBtn}
              onClick={onDone}
              icon="✅"
              aria-label="Done, what else?"
            />
          )}
        </div>
      </div>
    </article>
  )
}

ActivityCard.propTypes = {
  /** Activity title */
  title: PropTypes.string.isRequired,
  /** Number of participants needed for this activity */
  participants: PropTypes.number.isRequired,
  /** Activity category */
  category: PropTypes.string.isRequired,
  /** When true, it is announced in the card */
  isFree: PropTypes.bool,
  /** When provided the title turns into a anchor */
  href: PropTypes.string,
  /** Spread custom styles to parent */
  className: PropTypes.string,
  /** When provided it shows a skip button */
  onSkip: PropTypes.func,
  /** When provided it shows a done button */
  onDone: PropTypes.func,
}
