export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface AsyncState<T> {
  loading: boolean
  data: T | null
  error: Error | null
}

export type Action<T = unknown> =
  | { type: 'GET_USERS' }
  | { type: 'GET_USERS_SUCCESS'; data: T }
  | { type: 'GET_USERS_ERROR'; error: Error }
  | { type: 'GET_USER' }
  | { type: 'GET_USER_SUCCESS'; data: T }
  | { type: 'GET_USER_ERROR'; error: Error }

export interface State {
  users: AsyncState<User[]>
  user: AsyncState<User>
}
