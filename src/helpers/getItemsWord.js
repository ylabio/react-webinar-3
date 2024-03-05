function getItemsWord(count) {
    const lastDigit = count % 10;
    const secondLastDigit = Math.floor((count % 100) / 10);

    if (lastDigit === 1 && secondLastDigit !== 1) {
        return 'товар';
    } else if (lastDigit >= 2 && lastDigit <= 4 && secondLastDigit !== 1) {
        return 'товара';
    } else {
        return 'товаров';
    }
}
export default getItemsWord