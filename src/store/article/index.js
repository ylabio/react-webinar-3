import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      acticle: {},
    };
  }

  async loadArticle(_id) {
    try {
      const response = await fetch(
        `/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();
      this.setState({
        ...this.getState(),
        article: json.result,
      });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default Article;
