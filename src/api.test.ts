import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { getUsers, getUser } from './api'

vi.mock('axios')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedAxios = axios as any

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
      ]

      mockedAxios.get.mockResolvedValueOnce({ data: mockUsers })

      const users = await getUsers()

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users'
      )
      expect(users).toEqual(mockUsers)
    })

    it('should handle errors when fetching users', async () => {
      const error = new Error('Network error')
      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(getUsers()).rejects.toThrow('Network error')
    })
  })

  describe('getUser', () => {
    it('should fetch a single user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
      }

      mockedAxios.get.mockResolvedValueOnce({ data: mockUser })

      const user = await getUser(1)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/1'
      )
      expect(user).toEqual(mockUser)
    })

    it('should handle errors when fetching a user', async () => {
      const error = new Error('User not found')
      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(getUser(999)).rejects.toThrow('User not found')
    })
  })
})
