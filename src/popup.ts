import { getDefaultDate } from './getDefaultDate'
import { getIntervals } from './getIntervals'

const formatDate = (date: Date) => {
  return [
    date.getFullYear().toString().padStart(4, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')
}

document.addEventListener('DOMContentLoaded', async () => {
  const dateInput = document.querySelector('#date') as HTMLInputElement
  const savedDate = await chrome.storage.sync.get(["vehicle_certification_date"])
  console.log('reading date:', JSON.stringify(savedDate))
  dateInput.value = savedDate?.vehicle_certification_date || formatDate(getDefaultDate())
  dateInput.onchange = async () => {
    console.log('Date changed:', dateInput.value)
    await chrome.storage.sync.set({ "vehicle_certification_date": dateInput.value });
  }
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
  const savedHour = await chrome.storage.sync.get(["vehicle_certification_hour"])
  intervalSelect.value = savedHour.vehicle_certification_hour || intervals[intervals.length - 1].id
  intervalSelect.onchange = async () => {
    console.log('Hour changed:', intervalSelect.value)
    await chrome.storage.sync.set({ "vehicle_certification_hour": intervalSelect.value });
  }
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
