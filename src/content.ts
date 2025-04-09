export {}

console.info('Vehicle certification extension activated')

const formatDate = (input: string) => {
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = input.match(datePattern)
  if (match === null) return ''
  const [_, year, month, day] = match
  return [day, month, year].join('.')
}

const getPeriods = () => {
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

chrome.runtime.onMessage.addListener(async ({ action, date }) => {
  if (action !== 'vehicle_certification') return
  const dateInput = document.querySelector('#date') as HTMLInputElement
  dateInput.value = formatDate(date)
  const hourSelect = document.querySelector(
    '#vehiclecertificationmodel-hour',
  ) as HTMLSelectElement
  hourSelect.removeAttribute('disabled')
  const periods = getPeriods()
  for (const period of periods) {
    const option = document.createElement('option')
    option.value = period
    option.textContent = period
    hourSelect.appendChild(option)
  }
  hourSelect.value = periods[0]
  const submitButton = document.querySelector(
    '#btn-get-order',
  ) as HTMLButtonElement
  submitButton.removeAttribute('disabled')
  submitButton.click()
})
