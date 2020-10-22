import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Styles from './Button.css'

export default function Button({
  children,
  className,
  icon,
  size,
  variant,
  isActive,
  isLoading,
  ...props
}) {
  const attrs = {}

  if (isActive !== undefined) {
    attrs['aria-pressed'] = isActive
  }

  if (!children && !props['aria-label']) {
    console.warn('Button with icon only must have a aria-label for accessibility')
  }

  return (
    <button
      className={cx(Styles.button, className, Styles[`size-${size}`], Styles[`variant-${variant}`])}
      {...attrs}
      {...props}
    >
      {icon ? <span>{icon}</span> : children}
    </button>
  )
}

Button.defaultProps = {
  size: 'md',
  variant: 'solid',
}

Button.propTypes = {
  /** Button text */
  children: PropTypes.node,
  /** Pass when the button is togglable */
  isActive: PropTypes.bool,
  /** When true, shows a loading progress and disables the button */
  isLoading: PropTypes.bool,
  /** Affects button font and padding sizes */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Affects button overall look */
  variant: PropTypes.oneOf(['solid', 'outline', 'reset']),
  /** For buttons that have only an icon */
  icon: PropTypes.string,
  /** Accessible name for icons without text (children) */
  'aria-label': PropTypes.string,
  /** Pass custom styles */
  className: PropTypes.string,
}
