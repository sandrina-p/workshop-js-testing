import React from 'react'
import { useRoute } from 'wouter'

import zero from '../../../challenges/0.md'

export default function Root() {
  const [, params] = useRoute('/briefings/:id')
  const refMD = React.useRef()

  React.useLayoutEffect(() => {
    if (typeof Prism !== undefined) Prism.highlightAllUnder(refMD.current) // eslint-disable-line
  }, [params])

  return (
    <div
      ref={refMD}
      className="briefingMD home"
      dangerouslySetInnerHTML={{ __html: zero }}
    ></div>
  )
}
