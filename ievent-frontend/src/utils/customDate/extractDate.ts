const extractDate = (date: Date) => {
  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nev',
    'Dez',
  ]

  const day = String(date.getUTCDate()).padStart(2, '0')
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = monthNames[month]
  const eventDate = `${day} ${monthName}, ${year}`
  return eventDate
}

export default extractDate
