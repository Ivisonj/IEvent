'use client'
import { useCallback } from 'react'

const useLocalStorage = () => {
  const get = useCallback((key: string) => {
    const localValue = window?.localStorage?.getItem(key)
    return localValue ? JSON.parse(localValue) : null
  }, [])

  const remove = useCallback((key: string) => {
    window?.localStorage?.removeItem(key)
  }, [])

  const set = useCallback((key: string, value: any) => {
    window?.localStorage?.setItem(key, JSON.stringify(value))
  }, [])

  return { get, set, remove }
}

export default useLocalStorage
