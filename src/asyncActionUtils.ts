import type { Action, AsyncState } from './types'

type PromiseFn<T, Args extends unknown[]> = (...args: Args) => Promise<T>
type Dispatch = (action: Action) => void

// 이 함수는 파라미터로 액션의 타입 (예: GET_USER) 과 Promise 를 만들어주는 함수를 받아옵니다.
export function createAsyncDispatcher<T, Args extends unknown[]>(
  type: string,
  promiseFn: PromiseFn<T, Args>
) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS` as const
  const ERROR = `${type}_ERROR` as const

  // 새로운 함수를 만듭니다.
  // ...rest 를 사용하여 나머지 파라미터를 rest 배열에 담습니다.
  async function actionHandler(dispatch: Dispatch, ...rest: Args): Promise<void> {
    dispatch({ type } as Action) // 요청 시작됨.
    try {
      const data = await promiseFn(...rest) // rest 배열을 spread 로 넣어줍니다.
      dispatch({
        type: SUCCESS,
        data
      } as Action)
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      dispatch({
        type: ERROR,
        error
      } as Action)
    }
  }

  return actionHandler
}

export const initialAsyncState: AsyncState<unknown> = {
  loading: false,
  data: null,
  error: null
}

// 로딩중일 때 바뀔 상태 객체
const loadingState: AsyncState<unknown> = {
  loading: true,
  data: null,
  error: null
}

// 성공했을 때의 상태 만들어주는 함수
const success = <T>(data: T): AsyncState<T> => ({
  loading: false,
  data,
  error: null
})

// 실패했을 때의 상태 만들어주는 함수
const error = <T>(err: Error): AsyncState<T> => ({
  loading: false,
  data: null,
  error: err
})

// 세가지 액션을 처리하는 리듀서를 만들어줍니다
// type 은 액션 타입, key 는 리듀서서 사용할 필드 이름입니다 (예: user, users)

export function createAsyncHandler(
  type: string,
  key: string
) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS` as const
  const ERROR = `${type}_ERROR` as const

  // 함수를 새로 만들어서
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handler(state: any, action: Action): any {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        }
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        }
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        }
      default:
        return state
    }
  }

  // 반환합니다
  return handler
}
