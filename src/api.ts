import axios from 'axios'
import type { User } from './types'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API_BASE_URL}/users`)
  return response.data
}

export async function getUser(id: number): Promise<User> {
  const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`)
  return response.data
}
