import StoreModule from "../module";

class MultiLingua extends StoreModule {

  initState() {
    return {
      Language: 'null',
      variablesLanguage: {
      buttonAddProduct: 'null',
      buttonDeleteProduct: 'null',
      Page1: {
        title: 'null',
        selectLanguage: {
          label: 'null',
          bauttonRu: 'null',
          bauttonEn: 'null',
        }
      },
      Page2: {
        madeIn: 'null',
        category: 'null',
        edition: 'null',
        price: 'null',
      },
      Total: {
        label: 'null',
      },
      Basket: {
        title: 'null',
        buttonClose: 'null',
        ItemQ: 'null',
      },
      BasketTool: {
        main: 'null',
        label: 'null',
        buttonBasket: 'null',
        product: {
          one: 'null',
          few: 'null',
          many: 'null',
        },
        empty: 'null',
      },
    }
    }
  }
  
  setVariable(language) {
    let variablesLanguage = this.getState().variablesLanguage;
    let exist = false;
    if (language == 'ru-RU') {
      variablesLanguage.buttonAddProduct = 'Добавить';
      variablesLanguage.buttonDeleteProduct = 'Удалить';
      variablesLanguage.Page1.title = 'Магазин';
      variablesLanguage.Page1.selectLanguage.label = 'Выбор языка';
      variablesLanguage.Page1.selectLanguage.bauttonRu = 'Русский';
      variablesLanguage.Page1.selectLanguage.bauttonEn = 'Английский';
      variablesLanguage.Page1.selectLanguage.bauttonDe = 'Немецкий';
      variablesLanguage.Page1.selectLanguage.bauttonCn = 'Китайский';
      variablesLanguage.Page2.madeIn = 'Страна производитель';
      variablesLanguage.Page2.category = 'Категория';
      variablesLanguage.Page2.edition = 'Год выпуска';
      variablesLanguage.Page2.price = 'Цена';
      variablesLanguage.Total.label = 'Итого';
      variablesLanguage.Basket.title = 'Корзина';
      variablesLanguage.Basket.buttonClose = 'Закрыть';
      variablesLanguage.Basket.ItemQ = 'шт';
      variablesLanguage.BasketTool.main = 'Главная';
      variablesLanguage.BasketTool.label = 'В корзине';
      variablesLanguage.BasketTool.buttonBasket = 'Перейти';
      variablesLanguage.BasketTool.product.one = 'товар';
      variablesLanguage.BasketTool.product.few = 'товара';
      variablesLanguage.BasketTool.product.many = 'товаров';
      variablesLanguage.BasketTool.empty = 'пусто';
      exist = true;
    }
    if (language == 'en-EN') {
      variablesLanguage.buttonAddProduct = 'Add';
      variablesLanguage.buttonDeleteProduct = 'Remove';
      variablesLanguage.Page1.title = 'Shop';
      variablesLanguage.Page1.selectLanguage.label = 'Language selection';
      variablesLanguage.Page1.selectLanguage.bauttonRu = 'Russian';
      variablesLanguage.Page1.selectLanguage.bauttonEn = 'English';
      variablesLanguage.Page1.selectLanguage.bauttonDe = 'German';
      variablesLanguage.Page1.selectLanguage.bauttonCn = 'Chinese';
      variablesLanguage.Page2.madeIn = 'Country of origin';
      variablesLanguage.Page2.category = 'Category';
      variablesLanguage.Page2.edition = 'Year of release';
      variablesLanguage.Page2.price = 'Price';
      variablesLanguage.Total.label = 'Total';
      variablesLanguage.Basket.title = 'Basket';
      variablesLanguage.Basket.buttonClose = 'Close';
      variablesLanguage.Basket.ItemQ = 'pcs';
      variablesLanguage.BasketTool.main = 'Main';
      variablesLanguage.BasketTool.label = 'In the shopping cart';
      variablesLanguage.BasketTool.buttonBasket = 'Go over';
      variablesLanguage.BasketTool.product.one = 'product';
      variablesLanguage.BasketTool.product.few = 'the product';
      variablesLanguage.BasketTool.product.many = 'products';
      variablesLanguage.BasketTool.empty = 'empty';
      exist = true;
      console.log('Один раз 2!');
    }
    if (language == 'de-DE') {
      variablesLanguage.buttonAddProduct = 'Hinzufügen';
      variablesLanguage.buttonDeleteProduct = 'Entfernen';
      variablesLanguage.Page1.title = 'Geschäft';
      variablesLanguage.Page1.selectLanguage.label = 'Sprachauswahl';
      variablesLanguage.Page1.selectLanguage.bauttonRu = 'Russisch';
      variablesLanguage.Page1.selectLanguage.bauttonEn = 'Englisch';
      variablesLanguage.Page1.selectLanguage.bauttonDe = 'Deutsch';
      variablesLanguage.Page1.selectLanguage.bauttonCn = 'Chinesisch';
      variablesLanguage.Page2.madeIn = 'Herstellerland';
      variablesLanguage.Page2.category = 'Kategorie';
      variablesLanguage.Page2.edition = 'Baujahr';
      variablesLanguage.Page2.price = 'Preis';
      variablesLanguage.Total.label = 'Insgesamt';
      variablesLanguage.Basket.title = 'Korb';
      variablesLanguage.Basket.buttonClose = 'Schließen';
      variablesLanguage.Basket.ItemQ = 'st';
      variablesLanguage.BasketTool.main = 'Hauptsaechliche';
      variablesLanguage.BasketTool.label = 'Im Korb';
      variablesLanguage.BasketTool.buttonBasket = 'Übergehen';
      variablesLanguage.BasketTool.product.one = 'die Ware';
      variablesLanguage.BasketTool.product.few = 'ware';
      variablesLanguage.BasketTool.product.many = 'waren';
      variablesLanguage.BasketTool.empty = 'es ist leer';
      exist = true;
    }
    if (language == 'cn-CN') {
      variablesLanguage.buttonAddProduct = '添加';
      variablesLanguage.buttonDeleteProduct = '移走';
      variablesLanguage.Page1.title = '商店';
      variablesLanguage.Page1.selectLanguage.label = '语言选择';
      variablesLanguage.Page1.selectLanguage.bauttonRu = '俄语';
      variablesLanguage.Page1.selectLanguage.bauttonEn = '英语';
      variablesLanguage.Page1.selectLanguage.bauttonDe = '德语';
      variablesLanguage.Page1.selectLanguage.bauttonCn = '中文';
      variablesLanguage.Page2.madeIn = '原产国家';
      variablesLanguage.Page2.category = '类别：';
      variablesLanguage.Page2.edition = '发行年份';
      variablesLanguage.Page2.price = '价格；价格';
      variablesLanguage.Total.label = '总计';
      variablesLanguage.Basket.title = '篮子；篮子';
      variablesLanguage.Basket.buttonClose = '关闭';
      variablesLanguage.Basket.ItemQ = '件';
      variablesLanguage.BasketTool.main = '主要';
      variablesLanguage.BasketTool.label = '在购物车里';
      variablesLanguage.BasketTool.buttonBasket = '过去';
      variablesLanguage.BasketTool.product.one = '产品';
      variablesLanguage.BasketTool.product.few = '产品';
      variablesLanguage.BasketTool.product.many = '产品中心';
      variablesLanguage.BasketTool.empty = '空的';
      exist = true;
    }
    if (exist == false) return;
    this.setState({
      ...this.getState(),
      Language: language,
      variablesLanguage: variablesLanguage,
    }, 'Устанавлиаем переменные языка');
  }
}

export default MultiLingua;
