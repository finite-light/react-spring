import * as React from 'react'
import { useContext, PropsWithChildren } from 'react'
import { useMemo } from './helpers'

/**
 * This context affects all new and existing `SpringValue` objects
 * created with the hook API or the renderprops API.
 */
export interface SpringContext {
  /** Pause all new and existing animations. */
  pause?: boolean
  /** Force all new and existing animations to be immediate. */
  immediate?: boolean
}

const ctx = React.createContext<SpringContext>({})

export const SpringContext = ({
  children,
  ...props
}: PropsWithChildren<SpringContext>) => {
  const inherited = useContext(ctx)
  const { pause = inherited.pause, immediate = inherited.immediate } = props

  // Memoize the context to avoid unwanted renders.
  props = useMemo(() => ({ pause, immediate }), [pause, immediate])

  const { Provider } = ctx
  return <Provider value={props}>{children}</Provider>
}

SpringContext.Provider = ctx.Provider
SpringContext.Consumer = ctx.Consumer

/** Get the current values of nearest `SpringContext` component. */
export const useSpringContext = () => useContext(ctx)
