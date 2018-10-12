export const getCommaNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFormatedPercentage = floatNumber => {
  const val = Math.round(floatNumber * 1000) / 10;
  return val.toFixed(1);
};
