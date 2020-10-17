import React from 'react'
import {
  // useLocation,
  useRoute,
} from 'wouter'

// import { linkTo } from '../../utils'
import briefings from '../../utils/briefingsMd'

import './briefingMD.css'

export default function Root() {
  // const [, setLocation] = useLocation()
  const [, params] = useRoute('/briefings/:id')

  return (
    <>
      <p>Brienfing {params.id}</p>
      <div className="briefingMD" dangerouslySetInnerHTML={{ __html: briefings[params.id] }}></div>
    </>
  )
}
