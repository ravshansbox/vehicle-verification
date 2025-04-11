import { actionTypes } from './constants'
import { getIntervals } from './getIntervals'

console.info('Vehicle certification extension activated')

const formatDate = (input: string) => {
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = input.match(datePattern)
  if (match === null) return ''
  const [_, year, month, day] = match
  return [day, month, year].join('.')
}

chrome.runtime.onMessage.addListener(async ({ action, date, interval }) => {
  if (action !== actionTypes.vehicle_certification) return
  const dateInput = document.querySelector('#date') as HTMLInputElement
  dateInput.value = formatDate(date)
  const intervalSelect = document.querySelector(
    '#vehiclecertificationmodel-hour',
  ) as HTMLSelectElement
  intervalSelect.removeAttribute('disabled')
  const intervals = getIntervals()
  for (const interval of intervals) {
    const option = document.createElement('option')
    option.value = interval.id
    option.textContent = interval.name
    intervalSelect.appendChild(option)
  }
  intervalSelect.value = interval
  const submitButton = document.querySelector(
    '#btn-get-order',
  ) as HTMLButtonElement
  submitButton.removeAttribute('disabled')
  submitButton.click()
})
