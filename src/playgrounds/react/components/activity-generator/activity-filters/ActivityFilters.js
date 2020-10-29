import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../form/button'
import TextField from '../../form/text-field'
import RadioField from '../../form/radio-field'
import { SelectField, SelectFieldOption } from '../../form/select-field'

import Styles from './ActivityFilters.css'

const activityTypes = [
  'education',
  'social',
  'busywork',
  'diy',
  'charity',
  'relaxation',
  'music',
  'recreational',
  'cooking',
]

export default function ActivityFilters({ onChange }) {
  const filtersState = React.useRef({
    type: null,
    participants: null,
    price: null,
  })

  function handleFieldChange(name, value) {
    filtersState.current[name] = value
    onChange(filtersState.current)
  }

  function handleResetClick(e) {
    filtersState.current = {}
    onChange(filtersState.current)
  }

  function handleFormSubmit(e) {
    // In case someone presses Enter while filling the filters
    e.preventDefault()
    // NOTE: For demo purposes, let's not implement the submit here.
  }

  return (
    <form className={Styles.wrapper} onSubmit={handleFormSubmit}>
      <h3 className={Styles.title}>Filters</h3>
      <div className={Styles.group}>
        <SelectField
          label="Category"
          defaultValue="blank"
          onChange={e => handleFieldChange('type', e.target.value)}
        >
          <SelectFieldOption value="blank" disabled>
            Anything
          </SelectFieldOption>
          {activityTypes.map(type => (
            <SelectFieldOption key={type} value={type}>
              {type}
            </SelectFieldOption>
          ))}
        </SelectField>

        <TextField
          label="People nr"
          type="number"
          placeholder="Any"
          onChange={e => handleFieldChange('participants', e.target.value)}
        />

        <RadioField
          label="Price"
          radios={[
            { label: 'Free', value: 'free' },
            { label: 'Paid', value: 'paid' },
          ]}
          onChange={e => handleFieldChange('price', e.target.value)}
        />
        <Button
          type="reset"
          variant="outline"
          size="sm"
          onClick={handleResetClick}
        >
          Reset
        </Button>
      </div>
      <div></div>
    </form>
  )
}

ActivityFilters.propTypes = {
  /** callback executed each time the filters are changed */
  onChange: PropTypes.func.isRequired,
}
