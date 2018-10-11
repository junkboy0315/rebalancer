export const getCommaNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFormatedPercentage = floatNumber => {
  return Math.floor(floatNumber * 1000) / 10;
};
