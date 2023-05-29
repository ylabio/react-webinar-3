import StoreModule from '../module';

class CatalogItem extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: null,
      loading: 'idle',
    };
  }

  async load(id) {
    this.setState({
      item: null,
      loading: 'loading',
    });
    const baseUrl = '/api/v1/articles';

    const url = `${baseUrl}/${id}?fields=*,madeIn(title,code),category(title)`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      const { _id, title, description, madeIn, edition, category, price } =
        json.result;

      this.setState({
        item: {
          _id,
          title,
          description,
          country: {
            title: madeIn.title,
            code: madeIn.code,
          },
          category: category.title,
          edition,
          price,
        },
        loading: 'idle',
      });
    } catch (err) {
      console.log(err.message);
      this.setState({
        ...this.getState(),
        loading: 'error',
      });
    }
  }
}

export default CatalogItem;
