console.log('Vehicle certification extension activated')

chrome.runtime.onMessage.addListener(({ action, date }) => {
  if (action !== 'vehicle_certification') return
  const dateInput = document.querySelector('#date')
  dateInput.focus()
  const day = document.querySelector(
    `[data-date="${new Date(date).getTime()}"]`,
  )
  day.classList.remove('disabled')
  day.click()
})
