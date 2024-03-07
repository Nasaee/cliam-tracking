const hasEqualValues = (a: object, b: object) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export default hasEqualValues;
