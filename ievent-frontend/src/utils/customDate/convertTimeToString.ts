const convertTimeToString = (date: Date) => {
  const data = new Date(date)
  const hour = String(data.getHours()).padStart(2, '0')
  const minutes = String(data.getMinutes()).padStart(2, '0')
  return `${hour}:${minutes}`
}

export default convertTimeToString
