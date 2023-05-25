import {useCallback} from "react";
import useStore from "../store/use-store";

export const i18nData = {
  en: {
    'main-head-title': 'Store',
    'basket-tool-main-link-title': 'Main page',
    'basket-tool-in-basket-title': 'in basket',
    'basket-tool-go-to-basket-title': 'open basket',
    'basket-tool-empty-basket-title': 'empty',
    'item-add-button-title': 'add',
    'basket-title': 'Basket',
    'basket-close-button-title': 'close',
    'basket-total-title': 'Total',
    'item-basket-remove-button-title': 'remove',
    'product-page-manufacturer-country-title': 'Manufacturer country',
    'product-page-category-title': 'Category',
    'product-page-year-of-issue-title': 'Year of issue',
    'product-page-price-title': 'Price',
    'product-page-add-button-title': 'Add',
  },

  ru: {
    'main-head-title': 'Магазин',
    'basket-tool-main-link-title': 'Главная',
    'basket-tool-in-basket-title': 'В корзине',
    'basket-tool-go-to-basket-title': 'перейти',
    'basket-tool-empty-basket-title': 'пусто',
    'item-add-button-title': 'добавить',
    'basket-title': 'Корзина',
    'basket-close-button-title': 'закрыть',
    'basket-total-title': 'Итого',
    'item-basket-remove-button-title': 'удалить',
    'product-page-manufacturer-country-title': 'Страна производитель',
    'product-page-category-title': 'Категория',
    'product-page-year-of-issue-title': 'Год выпуска',
    'product-page-price-title': 'Цена',
    'product-page-add-button-title': 'Добавить',
  }
}

export function useTranslate() {
  const store = useStore();
  const lang = store.getState().application.lang;

  return useCallback((strId) => {
    return i18nData[lang][strId] || null;
  }, [lang])

}
