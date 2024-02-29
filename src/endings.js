export const endings = (numb) => {
  const end1 = +(('' + numb).slice(-1));
  const end2 = +(('' + numb).slice(-2));

  if (end2 >= 10 && end2 <= 20 ) {
	  return `${numb} раз`;
  }

  if (end1 >= 2 && end1 <= 4) {
	  return `${numb} раза`;
  } else {
	  return `${numb} раз`;
  }
};
