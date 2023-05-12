let usedCodes = new Set();

export function generateCode() {
  let newCode;
  do {
    newCode = Math.floor(Math.random() * 1000); 
  } while (usedCodes.has(newCode));
  usedCodes.add(newCode);
  return newCode;
}
