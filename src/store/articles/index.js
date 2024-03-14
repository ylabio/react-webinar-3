import StoreModule from "../module";

class Articles extends StoreModule {
  initState() {
    return {
      data: null,
      isLoading: false,
      error: "",
    };
  }

  async loadArticle(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: "",
    });
    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=price,title,description,edition,madeIn(title,code),category(title)`
      );
      if (!response.ok) {
        throw new Error("bad request");
      }
      const product = await response.json();
      this.setState(
        {
          ...this.getState(),
          data: {
            ...product.result,
          },

          isLoading: false,
        },
        "Загружен товар из АПИ"
      );
    } catch (error) {
      this.setState({
        ...this.getState(),
        data: {},
        isLoading: false,
        error: error.message,
      });
    }
  }
  clearArticles() {
    this.setState({
      data: null,
      isLoading: false,
      error: "",
    });
  }
}

export default Articles;
