import React from 'react'

import { useBoredAPI, useBoredState } from '../../state/BoredContext'

import Button from '../form/button'
import ActivityFilters from '../activity-filters'
import ActivityCard from '../activity-card'

import Styles from './ActivityGenerator.css'

export default function ActivityGenerator() {
  const activityAPI = useBoredAPI()
  const activityState = useBoredState()
  const filters = React.useRef({})
  const [formStatus, setFormStatus] = React.useState('') // success | loading | failed
  const activityLatest = activityState.latest

  function handleFiltersChange(values) {
    filters.current = values
  }

  async function getNewActivity(opts) {
    const { type, participants, price } = filters.current
    setFormStatus('loading')
    await activityAPI.getNew({ type, participants, price }, opts)
    setFormStatus('success')
  }

  async function handleRandomClick() {
    await getNewActivity()
  }

  async function handleOnSkip() {
    await getNewActivity({ saveLatestTo: 'skipped' })
  }

  async function handleOnDone() {
    await getNewActivity({ saveLatestTo: 'done' })
  }

  return (
    <>
      <div className={Styles.wrapper}>
        {formStatus === 'loading' ? (
          <p>Looking...</p>
        ) : activityLatest ? (
          activityLatest.error ? (
            <div className={Styles.feedback}>
              <p className={Styles.error}>{activityLatest.error}</p>
              <p>Change filters and try again</p>
              <Button type="button" onClick={handleRandomClick}>
                Get random activity
              </Button>
            </div>
          ) : (
            <ActivityCard
              className={Styles.card}
              title={activityLatest.activity}
              category={activityLatest.type}
              participants={activityLatest.participants}
              isFree={!activityLatest.price}
              href={activityLatest.link}
              onSkip={handleOnSkip}
              onDone={handleOnDone}
            />
          )
        ) : (
          <Button type="button" size="lg" onClick={handleRandomClick}>
            Get random activity
          </Button>
        )}
      </div>
      <ActivityFilters onChange={handleFiltersChange} />
    </>
  )
}
