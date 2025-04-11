import dayjs from 'dayjs'
import { actions } from './constants'
import { getIntervals, getPotentialTargetDates } from './utils'

console.info('Vehicle certification extension activated')

chrome.runtime.onMessage.addListener(async ({ action, ...message }) => {
  if (action === actions.fetch_intervals) {
    for (const date of await getPotentialTargetDates()) {
      const formattedTargetDate = dayjs(date).format('DD.MM.YYYY')
      const response = await fetch(
        '/uz/vehicle-certification/default/get-custom-order-available-hours',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': (
              document.querySelector('meta[name=csrf-token]') as HTMLMetaElement
            ).content,
          },
          body: new URLSearchParams({
            'depdrop_parents[0]': formattedTargetDate,
            'depdrop_all_params[date]': formattedTargetDate,
          }),
        },
      )
      const { output } = await response.json()
      console.log(date, output)
    }
  }
  if (action === actions.submit) {
    const { date, interval } = message
    const dateInput = document.querySelector('#date') as HTMLInputElement
    dateInput.value = dayjs(date).format('DD.MM.YYYY')
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
  }
})
