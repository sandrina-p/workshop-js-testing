import React from 'react'
import PropTypes from 'prop-types'

import Styles from './TextField.css'

export default function TextField({ label, errorMsg, ...props }) {
  return (
    <label className={Styles.field}>
      <span className={Styles.label}>{label}</span>
      <input className={Styles.input} {...props}></input>
      {errorMsg && <span>{errorMsg}</span>}
    </label>
  )
}

TextField.propTypes = {
  /** Input label */
  label: PropTypes.string.isRequired,
  /** Input type: text, number, e-mail, etc... */
  type: PropTypes.string.isRequired,
  /** Error message */
  errorMsg: PropTypes.string,
}
