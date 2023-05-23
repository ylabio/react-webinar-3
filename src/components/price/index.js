import React from 'react';
import PropTypes from 'prop-types';

/**
 * Форматированная цена
 * Возвращает форматированную цену под указанную локаль
 * @param price {Number} Число, которое необходимо отформатировать
 * @param locale {String} Локаль
 * @param currency {String} Код валюты
 * @example <Price number={5999} locale='ru-RU'/>
 * @returns {*|string}
 */
function Price({price, locale, currency}){
  return (
      new Intl.NumberFormat(
        locale, 
        { 
          style: 'currency', 
          currency: currency,
          maximumFractionDigits: 0, 
          minimumFractionDigits: 0, 
        }).format(price)
  )
}

Price.propTypes = {
  price: PropTypes.number,
  locale: PropTypes.string,
  currency: PropTypes.string,
};

Price.defaultProps = {
  price: 0,
  locale: 'ru-RU',
  currency: 'RUB',
}

export default Price;
