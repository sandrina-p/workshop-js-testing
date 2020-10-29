import React from 'react'

import { BoredProvider } from './state/BoredContext'
import ActivityGenerator from './components/activity-generator'
import Footer from './components/footer'

import Styles from './index.css'

export default function BoredRoot() {
  return (
    <BoredProvider>
      <div className={Styles.app}>
        <h1 className={Styles.title}>Bored App</h1>
        <ActivityGenerator />
        <Footer />
      </div>
    </BoredProvider>
  )
}
