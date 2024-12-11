import axiosInstance from './axiosInstance'
import type { Charger } from '@/types'

export function getChargers (): Promise<Charger.GetChargers> {
  return axiosInstance.get('/chargers.json')
}
