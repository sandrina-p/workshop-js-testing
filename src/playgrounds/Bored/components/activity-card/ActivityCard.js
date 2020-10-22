import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Button from '../form/button'

import Styles from './ActivityCard.css'

function getSinguralOrPlural(count, singular, plural) {
  return count > 1 ? plural : singular
}

export default function ActivityCard({
  className,
  title,
  participants,
  href,
  category,
  isFree,
  onSkip,
  onDone,
}) {
  const TitleTag = href ? 'a' : 'p'
  const titleAttrs = {
    ...(href ? { href, target: '_blank' } : {}),
  }

  return (
    <article className={cx(Styles.wrapper, className)}>
      <div className={Styles.kicker}>
        <p className={Styles.category}>{category}</p>
        <p className={Styles.description}>
          For {participants} {getSinguralOrPlural(participants, 'person', 'people')}
          {isFree ? " and it's free!" : '.'}
        </p>
      </div>
      <TitleTag className={Styles.title} {...titleAttrs}>
        {title}
      </TitleTag>
      <div>
        <div className={Styles.ctas}>
          {onSkip && (
            <Button variant="outline" className={Styles.dismissBtn} onClick={onSkip}>
              Nah, give another
            </Button>
          )}
          {onDone && (
            <Button variant="outline" className={Styles.dismissBtn} onClick={onDone}>
              Done, what now?
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

ActivityCard.propTypes = {
  title: PropTypes.string.isRequired,
  participants: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
}
