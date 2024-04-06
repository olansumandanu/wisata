export const dateToString = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
};

export const stringDateFormat = (date: string) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formatter.format(new Date(date));
};

export const countDays = (checkIn: string, checkOut: string) => {
  const inDate = new Date(checkIn as string);
  const outDate = new Date(checkOut as string);
  const time_difference = Math.abs(outDate.getTime() - inDate.getTime()) / 1000;
  return Math.floor(time_difference / (60 * 60 * 24));
};
