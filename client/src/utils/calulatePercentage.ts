const calculatePercentage = (value: number, totalValue: number) => {
  return Math.round((value / totalValue) * 100);
};

export default calculatePercentage;
