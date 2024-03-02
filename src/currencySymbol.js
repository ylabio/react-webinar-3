  //import currencySymbol from 'node_modules/currency-symbol';
  
  function getLocale(currency) {
    return {
      usd: "en-US",
      rub: "ru-RU",
    }[currency.toLowerCase()];
  }
  
   function Currency({ currency, value }) {
    const locale = getLocale(currency);
    const options = {
      currency,
      locale,
      currencyDisplay: "symbol",
      style: "currency",
    };
  
    return (
        (value >= 0 ? Number(value).toLocaleString(locale, options,).replace(",00","") : '')
    );
  }
  
  export default Currency;