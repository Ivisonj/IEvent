const convertDateToString = (date: Date) => {
  const data = new Date(date)
  const day = String(data.getDate()).padStart(2, '0')
  const month = String(data.getMonth() + 1).padStart(2, '0')
  const year = data.getFullYear()
  return `${day}/${month}/${year}`
}

export default convertDateToString
