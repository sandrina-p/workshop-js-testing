import React from 'react'
import PropTypes from 'prop-types'

/**
 * Let's assume this Link would be from an external routing module
 * e.g. react-router, nextjs, etc...
 */
export default function Link({ to, onClick, children, ...props }) {
  function handleClick(e) {
    // ...
    // Some window navigation magic ...
    // ...

    onClick(e)
  }
  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
