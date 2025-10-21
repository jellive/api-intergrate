import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useAsync from './useAsync'

describe('useAsync', () => {
  it('should initialize with loading false and data null', () => {
    const mockCallback = vi.fn().mockResolvedValue('test data')
    const { result } = renderHook(() => useAsync(mockCallback, [], true))

    expect(result.current[0]).toEqual({
      loading: false,
      data: null,
      error: null,
    })
  })

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    const mockCallback = vi.fn().mockResolvedValue(mockData)

    const { result } = renderHook(() => useAsync(mockCallback))

    // Initially loading
    expect(result.current[0].loading).toBe(true)

    await waitFor(() => {
      expect(result.current[0].loading).toBe(false)
    })

    expect(result.current[0].data).toEqual(mockData)
    expect(result.current[0].error).toBeNull()
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle errors', async () => {
    const mockError = new Error('Test error')
    const mockCallback = vi.fn().mockRejectedValue(mockError)

    const { result } = renderHook(() => useAsync(mockCallback))

    await waitFor(() => {
      expect(result.current[0].loading).toBe(false)
    })

    expect(result.current[0].data).toBeNull()
    expect(result.current[0].error).toEqual(mockError)
  })

  it('should allow manual refetch', async () => {
    const mockData = { id: 1, name: 'Test' }
    const mockCallback = vi.fn().mockResolvedValue(mockData)

    const { result } = renderHook(() => useAsync(mockCallback, [], true))

    expect(result.current[0].data).toBeNull()

    // Manual fetch
    await result.current[1]()

    await waitFor(() => {
      expect(result.current[0].data).toEqual(mockData)
    })

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should skip initial fetch when skip is true', async () => {
    const mockCallback = vi.fn().mockResolvedValue('test')

    renderHook(() => useAsync(mockCallback, [], true))

    await waitFor(() => {
      expect(mockCallback).not.toHaveBeenCalled()
    })
  })
})
