export default function setPaddingLeft(level, offset) {
  if (level <= 15) return level * offset;
  else return 15 * offset;
}
