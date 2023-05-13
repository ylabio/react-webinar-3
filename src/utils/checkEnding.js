/**
 * Валилация окончания слова РАЗ в зависимости от переданного числа
 * @param numb {Number} число, в зависимости от которого формируется окончание
 * @param {firstWord, secondWord, thirdWord}  - формы слова для формирования окончания
 * @returns {String}
 */

export const checkEnding = (numb, {firstWord, secondWord, thirdWord}) => {
  const numbString = numb.toString();
  const words = [firstWord, secondWord, thirdWord];
  return `${numbString} ` + words[(numb % 100 > 4 && numb % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(numb % 10 < 5) ? numb % 10 : 5]];
}