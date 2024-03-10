import StoreModule from "../module";

class Info extends StoreModule {

  initState() {
    return {
      title: '',
      itemInfo: {
        description: '',
        price: 0,
        madeIn: {
          title: '',
          code: '',
        },
        edition: 0,
        category: {
          title: '',
        }
      }
    }
  }

  async load(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      title: json.result.title,
      itemInfo: {
        description: json.result.description,
        price: json.result.price,
        madeIn: {
          title: json.result.madeIn.title,
          code: json.result.madeIn.code,
        },
        edition: json.result.edition,
        category: {
          title: json.result.category.title,
        }
      },
    }, 'Загружена информация о товаре из API');
  }
}

export default Info;
