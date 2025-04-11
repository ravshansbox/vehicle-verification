import dayjs from 'dayjs'

export const getDefaultDate = () => {
  const date = new Date()
  const diff = date.getHours() === 0 ? 15 : 16
  date.setDate(date.getDate() + diff)
  return date
}

export const getIntervals = () => {
  return new Array(24)
    .fill(null)
    .map((_, index) => {
      const currentHour = index.toString().padStart(2, '0')
      const nextHour = (index + 1).toString().padStart(2, '0')
      return [
        {
          id: `${currentHour}:00:00`,
          name: `${currentHour}:00-${currentHour}:15`,
        },
        {
          id: `${currentHour}:15:00`,
          name: `${currentHour}:15-${currentHour}:30`,
        },
        {
          id: `${currentHour}:30:00`,
          name: `${currentHour}:30-${currentHour}:45`,
        },
        {
          id: `${currentHour}:45:00`,
          name: `${currentHour}:45-${nextHour}:00`,
        },
      ]
    })
    .flat()
}

export const getPotentialTargetDates = async () => {
  let targetDate = dayjs(getDefaultDate())
  const today = dayjs(new Date())
  const result = []
  while (targetDate.format('YYYY-MM-DD') !== today.format('YYYY-MM-DD')) {
    if (targetDate.day() !== 0) {
      result.push(targetDate.format('YYYY-MM-DD'))
    }
    targetDate = targetDate.subtract(1, 'day')
  }
  return result
}
