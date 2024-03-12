const RU_UI_TEXTS = {
  main: {
    head: {
      headTitle: 'Магазин'
    },
    basketTool: {
      homeBtn: 'Главная',
      inCart: 'В корзине',
      empty: 'пусто',
      toCartBtn: 'Перейти',
      goods: {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      }
    },
    catalogList: {
      addItemBtn: 'Добавить'
    }
  },
  basket: {
    head: {
      headTitle: 'Корзина',
      closeModalBtn: 'Закрыть',
    },
    basketList: {
      quantities: 'шт',
      removeItemBtn: 'Удалить'
    },
    total: {
      totalSum: 'Итого'
    }
  },
  product: {
    mainContent: {
      madeIn: 'Страна изготовитель',
      category: 'Категория',
      edition: 'Год выпуска',
      price: 'Цена',
      addItemBtn: 'Добавить'
    }
  }
}

RU_UI_TEXTS.product.basketTool = RU_UI_TEXTS.main.basketTool

export default RU_UI_TEXTS;
