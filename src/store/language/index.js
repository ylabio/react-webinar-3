import StoreModule from "../module";

class Languages extends StoreModule {

  initState() {
    return {
      language: 'ru',
      ru: {
        head: {
          navButton: 'Главная',
          basketText: 'В корзине',
          basketCurrentEmpty: 'пусто',
          basketCurrentOne: 'товар',
          basketCurrentTwo: 'тавара',
          basketCurrentMany: 'товаров',
          basketButton: 'Перейти',
          basketCloseButton: 'Закрыть'
        },
        main: {
          title: 'Магазин'
        },
        basket: {
          title: 'Корзина',
          closeButtonText: 'Закрыть',
          itemButtonText: 'Удалить',
          resultText: 'Итого'
        },
        itemPage: {
          madeIn: 'Страна производитель',
          category: 'Категория',
          edition: 'Год выпуска',
          price: 'Цена',
          itemDeleteButtonText: 'Удалить',
          itemAddButtonText: 'Добавить'
        },
        values: {
          currency: '₽',
          unit: 'шт',
        } 
      },
      en: {
        head: {
          navButton: 'Main',
          basketText: 'In Basket',
          basketCurrentEmpty: 'empty',
          basketCurrentOne: 'article',
          basketCurrentTwo: 'articles',
          basketCurrentMany: 'articles',
          basketButton: 'Go to',
          basketCloseButton: 'Close'
        },
        main: {
          title: 'Store'
        },
        basket: {
          title: 'Basket',
          closeButtonText: 'Close',
          itemButtonText: 'Delete',
          resultText: 'Result'
        },
        itemPage: {
          madeIn: 'Made in',
          category: 'Category',
          edition: 'Edition',
          price: 'Price',
          itemDeleteButtonText: 'Delete',
          itemAddButtonText: 'Add'
        },
        values: {
          currency: '₽',
          unit: 'pieces',
        } 
      }
    }
  }

  setLanguage(language) {
    this.setState({...this.getState(), language: language});
  }
}

export default Languages;
