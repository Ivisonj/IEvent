const formatHours = (hour: string) => {
  const [hours, minutes] = hour.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return date
}

export default formatHours
