export class CustomDate {
  public static customHours(date: Date): Date {
    date.setHours(23, 59, 59, 999);
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return utcDate;
  }

  public static fixTimezoneoffset(date: Date): Date {
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return utcDate;
  }

  public static formatDate(date: string): Date {
    const [year, month, day] = date.split('-');

    const formattedDate = new Date(
      `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59:59.999Z`,
    );
    return formattedDate;
  }
}
