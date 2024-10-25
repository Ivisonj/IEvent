const fixTimezone = (date: Date): Date => {
  const offsetInMinutes = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offsetInMinutes)

  return date
}

export default fixTimezone
