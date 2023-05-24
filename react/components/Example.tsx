import type { FC } from 'react'
import React from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES: readonly string[] = ['example']

/**
 * @description Example React Component.
 * @version 1.0.0
 */
const Example: FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <p className={classNames(handles.example, 'flex')}>
      This is an example component
    </p>
  )
}

export default Example
