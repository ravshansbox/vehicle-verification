export const getDefaultDate = () => {
  const date = new Date()
  const diff = date.getHours() === 0 ? 15 : 16
  date.setDate(date.getDate() + diff)
  return date
}
