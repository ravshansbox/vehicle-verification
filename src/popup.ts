export {}

const getDefaultDate = () => {
  const date = new Date()
  const diff = date.getHours() === 0 ? 15 : 16
  date.setDate(date.getDate() + diff)
  return date
}

const formatDate = (date: Date) => {
  return [
    date.getFullYear().toString().padStart(4, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')
}

document.addEventListener('DOMContentLoaded', () => {
  const date = document.querySelector('#date') as HTMLInputElement
  date.value = formatDate(getDefaultDate())
  const button = document.querySelector('#submit') as HTMLButtonElement
  button.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return
    await chrome.tabs.sendMessage(tab.id, {
      action: 'vehicle_certification',
      date: date.value,
    })
  })
})
