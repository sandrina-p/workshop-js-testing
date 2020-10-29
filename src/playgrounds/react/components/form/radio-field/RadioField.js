import React from 'react'
import PropTypes from 'prop-types'

import Styles from './RadioField.css'

export default function RadioField({ label, radios, onChange, ...props }) {
  const name = label.replace(' ', '-')
  return (
    <fieldset className={Styles.field}>
      <legend className={Styles.label}>{label}</legend>
      {radios.map(({ value, label }) => (
        <label key={value} className={Styles.radio}>
          <input name={name} value={value} type="radio" onChange={onChange} />
          <legend className={Styles.radioLabel}>{label}</legend>
        </label>
      ))}
    </fieldset>
  )
}

RadioField.propTypes = {
  /** Input label */
  label: PropTypes.string.isRequired,
  /** List of radio fields */
  radios: PropTypes.array.isRequired,
  /** Callback executed when checking on of the inputs */
  onChange: PropTypes.func,
}
