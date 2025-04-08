import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      listEn: [],
    };
  }


  async load(num, limit) {
    console.log()
    let response = await fetch(`/api/v1/articles?lang=ru&limit=${limit}&skip=${num}`);
    let json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );

    response = await fetch(`/api/v1/articles?lang=en&limit=${limit}&skip=${num}`);
    json = await response.json();
    this.setState(
      {
        ...this.getState(),
        listEn: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }


  async loadProduct(id, lang) {

  
    const response = await fetch(`/api/v1/articles/${id}?lang=${lang}`);

    const json = await response.json();

    const country = await fetch(`/api/v1/countries/${json.result.madeIn._id}?lang=${lang}`);
    const countryJson = await country.json();

    const category = await fetch(`/api/v1/categories/${json.result.category._id}?lang=${lang}`);
    const categoryJson = await category.json();


    const responseRu = await fetch(`/api/v1/articles/${id}?lang=ru`);
    const jsonRu = await responseRu.json();

    const responseEn = await fetch(`/api/v1/articles/${id}?lang=en`);
    const jsonEn = await responseEn.json();

    this.setState(
      {
        ...this.getState(),
        productTitle: json.result.title,
        productDescription: json.result.description,
        productEdition: json.result.edition,
        productPrice: json.result.price,
        productCountry: countryJson.result.title,
        productCategory: categoryJson.result.title,
        productId: json.result._id,

        productTitleRu: jsonRu.result.title,
        productTitleEn: jsonEn.result.title
      },
      'Загружена информация о товаре из API',
    );
  }


}

export default Catalog;
