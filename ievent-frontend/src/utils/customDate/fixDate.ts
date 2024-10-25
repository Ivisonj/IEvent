const fixDate = (date: Date) => {
  const day = String(date.getDate() + 1).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const selectedDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`)
  return selectedDate
}

export default fixDate
