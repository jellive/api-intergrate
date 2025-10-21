import { useReducer, useEffect, type DependencyList } from 'react'
import type { AsyncState } from './types'

type Action<T> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'ERROR'; error: Error }

function reducer<T>(_state: AsyncState<T>, action: Action<T>): AsyncState<T> {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`)
  }
}

function useAsync<T>(
  callback: () => Promise<T>,
  deps: DependencyList = [],
  skip = false
): [AsyncState<T>, () => Promise<void>] {
  const [state, dispatch] = useReducer(reducer<T>, {
    loading: false,
    data: null,
    error: null
  })

  const fetchData = async (): Promise<void> => {
    dispatch({ type: 'LOADING' })
    try {
      const data = await callback()
      dispatch({ type: 'SUCCESS', data })
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      dispatch({ type: 'ERROR', error })
    }
  }

  useEffect(() => {
    if (skip) return
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [state, fetchData]
}

export default useAsync
