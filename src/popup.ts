import { getDefaultDate } from './getDefaultDate'
import { getIntervals } from './getIntervals'

const formatDate = (date: Date) => {
  return [
    date.getFullYear().toString().padStart(4, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')
}

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.querySelector('#date') as HTMLInputElement
  dateInput.value = formatDate(getDefaultDate())
  const intervalSelect = document.querySelector(
    '#interval',
  ) as HTMLSelectElement
  const intervals = getIntervals()
  for (const interval of intervals) {
    const option = document.createElement('option')
    option.value = interval.id
    option.textContent = interval.name
    intervalSelect.appendChild(option)
  }
  intervalSelect.value = intervals[intervals.length - 1].id
  const button = document.querySelector('#submit') as HTMLButtonElement
  button.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return
    await chrome.tabs.sendMessage(tab.id, {
      action: 'vehicle_certification',
      date: dateInput.value,
      interval: intervalSelect.value,
    })
  })
})
