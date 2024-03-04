export function getTotal(cart) {
  var totalCost = 0;
  for (let item of cart) {
    totalCost += item.price * item.quantity;
  }
  return totalCost;
}
