import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({
  language: 'ru',
  setLanguage: () => {},
  translations: {}
});

const translations = {
  ru: {
    title: 'Магазин',
    addButton: 'Добавить',
    deleteButton: 'Удалить',
    basketTitle: 'Корзина',
    navTitle: 'Главная',
    cartItems: {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    },
    empty: 'пусто',
    selectQty: 'Выберите кол-во товаров',
    quantity: 'шт',
    totalInCart: 'Итого',
    cartEmpty: 'В вашей корзине пока пусто',
    countryDev: 'Страна производитель',
    productCat: 'Категория',
    productDevDate: 'Год выпуска',
    productPrice: 'Цена',
    notFound: 'Страница не найдена',
    notFoundBtn: 'Перейти на главную'
  },
  en: {
    title: 'Store',
    addButton: 'Add to cart',
    deleteButton: 'Delete',
    basketTitle: 'Shopping Basket',
    navTitle: 'Home',
    cartItems: {
      one: 'product',
      few: 'products',
      many: 'products',
    },
    empty: 'empty',
    selectQty: 'Select product quantity',
    quantity: 'pcs',
    totalInCart: 'Total',
    cartEmpty: 'Your cart is currently empty.',
    countryDev: 'Made in',
    productCat: 'Category',
    productDevDate: 'Year of release',
    productPrice: 'Price',
    notFound: 'Page not found',
    notFoundBtn: 'Go home'
    

  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};


export default LanguageContext