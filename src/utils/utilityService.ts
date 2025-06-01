import dayjs from "dayjs";

export const getDateFormat = (date: string, format: string): string => {
  return dayjs(date).format(format);
};
