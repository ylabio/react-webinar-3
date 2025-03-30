export const generateCode = (function (start = 0) {
  return () => ++start;
})();
