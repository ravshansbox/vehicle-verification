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
