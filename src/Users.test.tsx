import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UsersProvider } from './UsersContext'
import Users from './Users'
import * as api from './api'

vi.mock('./api')

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509', lng: '-34.4618' },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
]

describe('Users Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render load button initially', () => {
    render(
      <UsersProvider>
        <Users />
      </UsersProvider>
    )

    expect(screen.getByText('불러오기')).toBeInTheDocument()
  })

  it('should show loading state', async () => {
    vi.mocked(api.getUsers).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockUsers), 100))
    )

    render(
      <UsersProvider>
        <Users />
      </UsersProvider>
    )

    const loadButton = screen.getByText('불러오기')
    await userEvent.click(loadButton)

    expect(screen.getByText('로딩중..')).toBeInTheDocument()
  })

  it('should display users after successful fetch', async () => {
    vi.mocked(api.getUsers).mockResolvedValue(mockUsers)

    render(
      <UsersProvider>
        <Users />
      </UsersProvider>
    )

    const loadButton = screen.getByText('불러오기')
    await userEvent.click(loadButton)

    await waitFor(() => {
      expect(screen.getByText(/Bret/)).toBeInTheDocument()
      expect(screen.getByText(/Antonette/)).toBeInTheDocument()
    })
  })

  it('should show error state on fetch failure', async () => {
    vi.mocked(api.getUsers).mockRejectedValue(new Error('Network error'))

    render(
      <UsersProvider>
        <Users />
      </UsersProvider>
    )

    const loadButton = screen.getByText('불러오기')
    await userEvent.click(loadButton)

    await waitFor(() => {
      expect(screen.getByText('에러가 발생했습니다')).toBeInTheDocument()
    })
  })

  it('should allow refetching users', async () => {
    vi.mocked(api.getUsers).mockResolvedValue(mockUsers)

    render(
      <UsersProvider>
        <Users />
      </UsersProvider>
    )

    const loadButton = screen.getByText('불러오기')
    await userEvent.click(loadButton)

    await waitFor(() => {
      expect(screen.getByText('다시 불러오기')).toBeInTheDocument()
    })

    const refetchButton = screen.getByText('다시 불러오기')
    await userEvent.click(refetchButton)

    expect(vi.mocked(api.getUsers)).toHaveBeenCalledTimes(2)
  })
})
