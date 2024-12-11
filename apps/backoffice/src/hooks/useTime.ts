import type { Charger } from '@/types'

type TimeDuration = {
  d: number | false,
  h: number | false,
  m: number | false,
  s: number | false
}

type TimeFormats = (keyof TimeDuration)[]

export function useTime () {
  return {
    getTime
  }
}

function getTime (charger: Charger.Detail) {
  const validatedFormat: TimeFormats = ['d', 'h', 'm', 's']
  const times = getTimeDuration(charger.chargingTime / 1000, validatedFormat)

  let result = validatedFormat
    .filter(unit => times[unit])
    .map(unit => `${times[unit]}${unit}`)
    .join(' ')

  if (!result) {
    result = `0${validatedFormat.pop()}`
  }

  return result
}

function getTimeDuration (time = 0, format: string[]): TimeDuration {
  const hasDays = format.includes('d')
  const hasHours = format.includes('h')
  const hasMinutes = format.includes('m')
  const hasSeconds = format.includes('s')

  const secondsInADay = 86400
  const secondsInAHour = 3600
  const secondsInAMinute = 60

  let minutes = time
  let hours = time
  let seconds = time

  if (hasDays) {
    minutes = hours = seconds = time % secondsInADay
  }

  if (hasHours) {
    minutes = seconds = time % secondsInAHour
  }

  if (hasMinutes) {
    seconds = time % secondsInAMinute
  }

  return {
    d: hasDays && Math.floor(time / secondsInADay),
    h: hasHours && Math.floor(hours / secondsInAHour),
    m: hasMinutes && Math.floor(minutes / secondsInAMinute),
    s: hasSeconds && Math.floor(seconds)
  }
}
