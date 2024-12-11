import type { Charger } from '@/types'

export function useChargerStatus () {
  return {
    getStatus
  }
}

function getStatus (status: Charger.Detail['status']) {
  switch (status) {
    case 10:
    case 11:
      return {
        text: 'ready',
        color: 'var(--success-700)',
        bgColor: 'var(--success-500)'
      }

    case 20:
      return {
        text: 'charging',
        color: 'var(--info-700)',
        bgColor: 'var(--info-300)'
      }

    case 45:
    case 50:
    case 51:
    case 52:
    case 53:
    case 55:
      return {
        text: 'error',
        color: 'var(--danger-700)',
        bgColor: 'var(--danger-500)'
      }

    default:
      return {
        text: 'unknown',
        color: 'var(--grey-700)',
        bgColor: 'var(--grey-500)'
      }
  }
}

