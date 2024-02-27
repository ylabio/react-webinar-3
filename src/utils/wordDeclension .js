export function wordDeclension(num) {
  const remainder = num % 100;
  if (remainder >= 12 && remainder <= 14) return `${num} раз `;

  const lastNum = String(remainder).slice(-1);
  if (lastNum === "2" || lastNum === "3" || lastNum === "4") {
    return `${num} разa `;
  } else return `${num} раз `;
}
