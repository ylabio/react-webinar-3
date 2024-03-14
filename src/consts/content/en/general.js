import RU_UI_TEXTS from '../ru/general';

export const EN_UI_TEXTS = {
  main: {
    head: {
      headTitle: 'Store'
    },
    basketTool: {
      homeBtn: 'Home',
      inCart: 'Shopping cart is',
      empty: 'empty',
      toCartBtn: 'go to the cart',
      goods: {
        one: 'product',
        few: 'products',
        many: 'products',
      }
    },
    catalogList: {
      addItemBtn: 'Add'
    }
  },
  basket: {
    head: {
      headTitle: 'Cart',
      closeModalBtn: 'Close',
    },
    basketList: {
      quantities: 'pcs',
      removeItemBtn: 'Remove'
    },
    total: {
      totalSum: 'Total'
    }
  },
  product: {
    mainContent: {
      madeIn: 'Country of Manufacture',
      category: 'Category',
      edition: 'Edition',
      price: 'Price',
      addItemBtn: 'Add'
    }
  }
}

EN_UI_TEXTS.product.basketTool = EN_UI_TEXTS.main.basketTool

export default EN_UI_TEXTS
