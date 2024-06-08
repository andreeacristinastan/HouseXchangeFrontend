export const convertStringToDate = (strDate: string) => {
  const formattedDate = strDate.split("/");
  const [day, month, year] = formattedDate;
  const correctDate = new Date(Number(year), Number(month) - 1, Number(day));
  return correctDate;
};
