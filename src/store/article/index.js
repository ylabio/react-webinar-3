import StoreModule from "../module";


class Article extends StoreModule {


  initState() {
    return {
      _id: '646b6e1fe1626c0bd8518064',
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
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json();
    this.setState({
      ...this.getState(),
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