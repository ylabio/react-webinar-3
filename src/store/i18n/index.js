import StoreModule from "../module";
import { defaultLang, supportedLangs } from "../../config/i18nConfig";

class I18n extends StoreModule {
  initState() {
    return {
      lang: defaultLang,
      supportedLangs: { ...supportedLangs },
      translations: {
        ru: {
          shopName: "Магазин",
          category: "Категория",
          year: "Год выпуска",
          price: "Цена",
          add: "Добавить",
          country: "Страна производитель",
          main: "Главная",
          inCart: "В корзине",
          oneItem: "товар",
          fewItems: "товара",
          manyItems: "товаров",
          empty: "Пусто",
          forward: "Перейти",
          delete: "Удалить",
          pc: "шт",
          close: "Закрыть",
          total: "Итого",
          cart: "Корзина"
        },
        en: {
          shopName: "Shop",
          category: "Category",
          year: "Year",
          price: "Price",
          add: "Add",
          country: "Country",
          main: "Main",
          inCart: "In cart",
          oneItem: "item",
          fewItems: "items",
          manyItems: "items",
          empty: "Empty",
          forward: "Open",
          delete: "Delete",
          pc: "PC",
          close: "Close",
          total: "Total",
          cart: "Cart"
        },
      },
    };
  }

  setLang(lang) {
    this.setState({...this.getState(), lang}, 'Язык изменен');
  }
}

export default I18n;
