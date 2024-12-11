export interface Detail {
  id: number,
  type: 'Commander',
  name: string,
  serialNumber: string,
  chargingTime: number,
  energySupplied: number,
  currentCharging: number,
  manufacturedDate: string,
  wifiSignal: number,
  status: number,
  connectivityType: 'ethernet'
}

export type GetChargers = {
  chargers: Detail[]
}
