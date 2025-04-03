import StoreModule from '../module';

class Languages extends StoreModule {
  initState() {
    return {
      currentLanguage: 'ru',
      text: {
        ru: {
          titleShop: 'Магазин',
          mainPage: 'Главная',
          inBasket: 'В корзине',
          go: 'Перейти',
          empty: 'Пусто',
          add: 'Добавить',
          titleBasket: 'Корзина',
          basketTotal: 'Итого',
          delete: 'Удалить',
          countryOrigin: 'Страна производитель',
          category: 'Категория',
          yearManufacture: 'Год выпуска',
          price: 'Цена',
          pcs: 'шт',
          plural: {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          },
        },
        en: {
          titleShop: 'Shop',
          mainPage: 'Main',
          inBasket: 'In Basket',
          go: 'Go to Basket',
          empty: 'Empty',
          add: 'Add',
          titleBasket: 'Basket',
          basketTotal: 'Total',
          delete: 'Delete',
          countryOrigin: 'Country of Origin',
          category: 'Category',
          yearManufacture: 'Year of manufacture',
          price: 'Price',
          pcs: 'pcs',
          plural: {
            one: 'item',
            few: 'items',
            many: 'items',
          },
        },
      },
    };
  }

  setLanguages(lang) {
    this.setState(
      {
        ...this.getState(),
        currentLanguage: lang,
      },
      'Смена языка',
    );
  }
}

export default Languages;
