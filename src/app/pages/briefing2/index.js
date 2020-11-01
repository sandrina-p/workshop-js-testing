import React from 'react'
import { useRoute } from 'wouter'

import cx from 'classnames'

import briefings from '../../data/briefings'

import Styles from './briefingMD.css'

export default function Root() {
  const [, params] = useRoute('/briefings/:id')
  const [hiddenIntro, setHiddenIntro] = React.useState(false)
  const refMD = React.useRef()

  React.useLayoutEffect(() => {
    if (typeof Prism !== undefined) Prism.highlightAllUnder(refMD.current) // eslint-disable-line
  }, [params])

  return (
    <>
      <button
        className={Styles.briefingBtnTgle}
        aria-label="Hide visually the introduction"
        onClick={() => setHiddenIntro(bool => !bool)}
      >
        {hiddenIntro ? '👀' : '🗣'}
      </button>
      <div
        ref={refMD}
        className={cx('briefingMD', { hiddenIntro: hiddenIntro })}
        dangerouslySetInnerHTML={{ __html: briefings[params.id].briefing }}
      ></div>
    </>
  )
}
