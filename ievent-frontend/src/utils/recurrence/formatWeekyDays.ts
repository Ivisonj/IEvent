export interface WeekDays {
  sunday: boolean
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
}

const formatWeekDays = (arr: number[] = []): WeekDays => {
  const daysOfWeek: (keyof WeekDays)[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  return daysOfWeek.reduce<WeekDays>((acc, day, index) => {
    acc[day] = arr.includes(index)
    return acc
  }, {} as WeekDays)
}

export default formatWeekDays
