export const getIntervals = () => {
  return new Array(24)
    .fill(null)
    .map((_, index) => {
      const currentHour = index.toString().padStart(2, '0')
      const nextHour = (index + 1).toString().padStart(2, '0')
      return [
        `${currentHour}:00-${currentHour}:15`,
        `${currentHour}:15-${currentHour}:30`,
        `${currentHour}:30-${currentHour}:45`,
        `${currentHour}:45-${nextHour}:00`,
      ]
    })
    .flat()
}
