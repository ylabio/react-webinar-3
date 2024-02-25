export function wordDeclension(num) {
  if (num === 12 || num === 13 || num === 14) return `${num} раз `;

  const lastNum = String(num).slice(-1);
  if (lastNum === "2" || lastNum === "3" || lastNum === "4") {
    return `${num} разa `;
  } else return `${num} раз `;
}
