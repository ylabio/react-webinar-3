import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      itemInfo: {},
      error: false,
      isLoading: false,
    };
  }

  addItemInfo(item) {
    this.setState({ ...this.getState(), itemInfo: item });
  }

  async getFetchItemInfo(id) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const json = await response.json();
      this.setState({
        ...this.getState(),
        itemInfo: json.result,
        error: false,
        isLoading: false,
      });
    } catch (error) {
      console.error(error.message);
      this.setState({
        ...this.getState(),
        error: true,
        isLoading: false,
      });
    }
  }
}

export default Article;