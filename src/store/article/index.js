import StoreModule from "../module";


class Article extends StoreModule {

  initState() {
    return {
      data: {}
    }
  }

 // Загрузка товаров по ID
  async loadById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    const {
      _id,
      title,
      description,
      madeIn: { title: madeTitle, code },
      edition,
      category: { title: categoryTitle },
      price,
    } = json.result;

    this.setState(
      {
        ...this.getState(),
        data: {
          _id,
          categoryTitle,
          title,
          description,
          madeTitle,
          edition,
          price,
          code,
        },
    },
      "Загружен товар по ID"
    );
  }
}

export default Article;
