import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'ru', // По умолчанию русский язык
      translations: {
        ru: {
          headerTitle: 'Магазин',
          main: 'Главная',
          add: 'Добавить',
          remove: 'Удалить',
          goTo: 'Перейти',
          close: "Закрыть",
          basketTitle: 'Корзина',
          inBasket: "В корзине:",
          basketTotal: 'Итого',
          empty: "пусто",
          pieces: "шт",
          forPlural: {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          },
        },
        en: {
          headerTitle: 'Shop',
          main: 'Main',
          add: 'Add',
          remove: 'Remove',
          goTo: 'Go to',
          close: 'Close',
          basketTitle: 'Basket',
          inBasket: "Cart:",
          basketTotal: 'Total',
          empty: "is empty",
          pieces: "pcs",
          forPlural: {
            one: 'product',
            few: 'products',
            many: 'products'
          },
        }
      }
    }
  }

  // Функция для изменения языка
  setLanguage(language) {
    this.setState({ ...this.getState(), language }, `Изменение языка на ${language}`);
  }
}

export default Language;
