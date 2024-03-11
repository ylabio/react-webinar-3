import StoreModule from "../module";

class Localization extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      languages: [
        {
          code: "ru-RU",
          title: 'Русский',
        },
        {
          code: "en-US",
          title: 'English',
        },
      ],
      currentLanguage: '', 
      uiElements: {
        mainTitle: {
          "ru-RU": "Магазин",
          "en-US": "Shop",
        },
        returnText: {
          "ru-RU": "Главная",
          "en-US": "Return",
        },
        basketTitle: {
          "ru-RU": "Корзина",
          "en-US": "Shopping cart",
        },
        basketInCart: {
          "ru-RU": "В корзине",
          "en-US": "In cart",
        },
        basketEmpty: {
          "ru-RU": "пусто",
          "en-US": "empty",
        },
        basketTotal: {
          "ru-RU": "Итого",
          "en-US": "Total",
        },
        basketAdd: {
          "ru-RU": "Добавить",
          "en-US": "Buy",
        },
        basketRemove: {
          "ru-RU": "Удалить",
          "en-US": "Remove",
        },
        modalClose: {
          "ru-RU": "Закрыть",
          "en-US": "Close",
        },
        basketOpen: {
          "ru-RU": "Перейти",
          "en-US": "My cart",
        },
        basketCountry: {
          "ru-RU": "Страна производитель",
          "en-US": "Country of origin",
        },
        basketCategory: {
          "ru-RU": "Категория",
          "en-US": "Category",
        },
        basketYear: {
          "ru-RU": "Год выпуска",
          "en-US": "Year of production",
        },
        basketCountables: {
          "ru-RU": {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          },
          "en-US": {
            one: 'item',
            few: 'items',
            many: 'items',
          },
        },
        itemCounter: {
          "ru-RU": "шт.",
          "en-US": "pcs.",
        },
        itemPrice: {
          "ru-RU": "Цена",
          "en-US": "Price",
        }
      }
    }
  }

  setCurrentLanguage(lang) {
    this.setState({
      ...this.getState(),
      currentLanguage: lang,
    });
  }
}

export default Localization;
