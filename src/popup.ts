import dayjs from 'dayjs'
import { actions } from './constants'
import { createTab, getDefaultDate, getIntervals, times } from './utils'

document.addEventListener('DOMContentLoaded', async () => {
  const dateInput = document.querySelector('#date') as HTMLInputElement
  const savedDate = await chrome.storage.sync.get([
    'vehicle_certification_date',
  ])
  dateInput.value =
    savedDate?.vehicle_certification_date ||
    dayjs(getDefaultDate()).format('YYYY-MM-DD')
  dateInput.onchange = async () => {
    await chrome.storage.sync.set({
      vehicle_certification_date: dateInput.value,
    })
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
  const savedHour = await chrome.storage.sync.get([
    'vehicle_certification_hour',
  ])
  intervalSelect.value =
    savedHour.vehicle_certification_hour || intervals[intervals.length - 1].id
  intervalSelect.onchange = async () => {
    await chrome.storage.sync.set({
      vehicle_certification_hour: intervalSelect.value,
    })
  }
  const fetchIntervalsButton = document.querySelector(
    '#fetch-intervals',
  ) as HTMLButtonElement
  fetchIntervalsButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return
    await chrome.tabs.sendMessage(tab.id, { action: actions.fetch_intervals })
  })
  const submitButton = document.querySelector('#submit') as HTMLButtonElement
  submitButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return
    await chrome.tabs.sendMessage(tab.id, {
      action: actions.submit,
      date: dateInput.value,
      interval: intervalSelect.value,
    })
  })
  const submitAllButton = document.querySelector(
    '#submit-all',
  ) as HTMLButtonElement
  submitAllButton.addEventListener('click', async () => {
    const intervals = getIntervals()
    const url = 'https://oldmy.gov.uz/uz/vehicle-certification'
    await Promise.all(
      times(2).map(async index => {
        const tab = await createTab(url)
        if (!tab.id) return
        await chrome.tabs.sendMessage(tab.id, {
          action: actions.submit,
          date: dateInput.value,
          interval: intervals[index].id,
        })
      }),
    )
  })
})
