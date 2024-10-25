const convertStringToDate = (str: string) => {
  const [day, month, year] = str.split('/')
  const formattedDate = new Date(
    `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59:59.999`,
  )
  return formattedDate
}

export default convertStringToDate
