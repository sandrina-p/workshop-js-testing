import React from 'react'
import { useRoute } from 'wouter'

import briefings from '../../data/briefings'

import './briefingMD.css'

export default function Root() {
  const [, params] = useRoute('/briefings/:id')
  const refMD = React.useRef()

  React.useLayoutEffect(() => {
    if (typeof Prism !== undefined) Prism.highlightAllUnder(refMD.current) // eslint-disable-line
  }, [params])

  return (
    <>
      <p>Brienfing {params.id}</p>
      <div
        ref={refMD}
        className="briefingMD"
        dangerouslySetInnerHTML={{ __html: briefings[params.id].briefing }}
      ></div>
    </>
  )
}
