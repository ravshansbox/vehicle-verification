console.info('Vehicle certification extension activated')

const formatDate = dateString => {
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = dateString.match(datePattern)
  if (match === null) return null
  const [_, year, month, day] = match
  return [day, month, year].join('.')
}

const getPeriods = () => {
  return new Array(24)
    .fill(null)
    .map((_item, index) => index)
    .map(hour => {
      const currentHour = hour.toString().padStart(2, '0')
      const nextHour = (hour + 1).toString().padStart(2, '0')
      return [
        `${currentHour}:00-${currentHour}:15`,
        `${currentHour}:15-${currentHour}:30`,
        `${currentHour}:30-${currentHour}:45`,
        `${currentHour}:45-${nextHour}:00`,
      ]
    })
    .flat()
}

chrome.runtime.onMessage.addListener(async ({ action, date }) => {
  if (action !== 'vehicle_certification') return
  const dateInput = document.querySelector('#date')
  dateInput.value = formatDate(date)
  const hourSelect = document.querySelector('#vehiclecertificationmodel-hour')
  hourSelect.removeAttribute('disabled')
  const periods = getPeriods()
  for (const period of periods) {
    const option = document.createElement('option')
    option.value = period
    option.textContent = period
    hourSelect.appendChild(option)
  }
  hourSelect.value = periods[0]
  const submitButton = document.querySelector('#btn-get-order')
  submitButton.removeAttribute('disabled')
  submitButton.click()
})
