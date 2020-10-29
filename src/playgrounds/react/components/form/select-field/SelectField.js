import React from 'react'
import PropTypes from 'prop-types'

import Styles from './SelectField.css'

export function SelectField({ label, errorMsg, children, ...props }) {
  return (
    <label className={Styles.field}>
      <span className={Styles.label}>{label}</span>
      <select className={Styles.select} {...props}>
        {children}
      </select>
      {errorMsg && <span>{errorMsg}</span>}
    </label>
  )
}

SelectField.propTypes = {
  /** Input label */
  label: PropTypes.string.isRequired,
  /** Error message */
  errorMsg: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.array])
  ),
}

export function SelectFieldOption({ children, ...props }) {
  return <option {...props}>{children}</option>
}

SelectFieldOption.propTypes = {
  /** Option text */
  children: PropTypes.string,
}
