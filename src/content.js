console.info('Vehicle certification extension activated')

chrome.runtime.onMessage.addListener(async ({ action, date }) => {
  if (action !== 'vehicle_certification') return
  const dateInput = document.querySelector('#date')
  dateInput.focus()
  const day = document.querySelector(
    `[data-date="${new Date(date).getTime()}"]`
  )
  day.classList.remove('disabled')
  day.click()
  const hourSelect = document.querySelector('#vehiclecertificationmodel-hour')
  hourSelect.removeAttribute('disabled')
  hourSelect.focus()
  await new Promise(resolve => setTimeout(resolve, 3000))
  new Array(24)
    .fill(null)
    .map((_item, index) => index)
    .map(hour => {
      const currentHour = hour.toString().padStart(2, '0')
      const nextHour = (hour + 1).toString().padStart(2, '0')
      return [
        `${currentHour}:00-${currentHour}:15`,
        `${currentHour}:15-${currentHour}:30`,
        `${currentHour}:30-${currentHour}:45`,
        `${currentHour}:45-${nextHour}:00`
      ]
    })
    .flat()
    .forEach(period => {
      const option = document.createElement('option')
      option.value = period
      option.textContent = period
      hourSelect.appendChild(option)
    })
  const firstOption = hourSelect.querySelector('option')
  hourSelect.value = firstOption.value
  const submitButton = document.querySelector('#btn-get-order')
  submitButton.focus()
  submitButton.click()
})
