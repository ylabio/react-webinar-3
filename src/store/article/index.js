import StoreModule from "../module";
import Catalog from "../catalog";


class Article extends StoreModule {
  constructor(store) {
    super(store);
  }

  initState() {
    return {
      _id: 0,
      title: '',
      description: '',
      price: 0,
      madeIn: {
        title: '',
        code: '',
      },
      edition: 0,
      category: {
        title:'',
      },
    }
  }

  async load(id) {
    const response = await fetch(`http://example.front.ylab.io/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json();
    this.setState({
      ...this.getState(),
      _id: id,
      title: json.result.title,
      description: json.result.description,
      price: json.result.price,
      madeIn: {
        title : json.result.madeIn.title,
        code: json.result.madeIn.code,
      },
      edition: json.result.edition,
      category: {
        title:  json.result.madeIn.title,
      },
    }, 'Загружены товары из АПИ');
  }
}

export default Article;