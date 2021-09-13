const dateUtilities = {
     getMonday(d: Date): Date {
      d = new Date(d);
      d.setHours(0, 0, 0, 0);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    },
    addDays(date: Date, days: number): Date {
      date = new Date(date);
      const diff = date.getDate() + days;
      return new Date(date.setDate(diff));
  
    }
  }
  export default dateUtilities;
