import StoreModule from '../module'

class Article extends StoreModule {
  initState() {
    return {
      item: {}
    }
  }

  async load(_id, lang = 'ru') {
    const response = await fetch(`/api/v1/articles/${_id}?lang=${lang}&fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружены товары из АПИ');
  }
}

export default Article;