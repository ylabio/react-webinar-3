import React, { createContext, useState } from "react";

export const localeDict = {
    ru: {
        shop: "Магазин",
        inCart: "В корзине",
        empty: "пусто",
        goTo: "Перейти",
        add: "Добавить",
        cart: "Корзина",
        close: "Закрыть",
        delete: "Удалить",
        total: "Итого",
        main: "Главная",
        item: {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        }
    },
    en: {
        shop: "Shop",
        inCart: "In the cart",
        empty: "empty",
        goTo: "Go to",
        add: "Add",
        cart: "Cart",
        close: "Close",
        delete: "Delete",
        total: "Total",
        main: "Main",
        item: {
            one: 'item',
            few: 'items',
            many: 'items'
          }
    }
}
export const localeContext = createContext(localeDict.ru)

export const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useState('ru')
    const changeLocale = (locale) => {
        setLocale(locale)
    }
    return (
        <localeContext.Provider value={{ locale, changeLocale }}>
            {children}
        </localeContext.Provider>
    )
}