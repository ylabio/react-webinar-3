import StoreModule from "../module";

class Info extends StoreModule {

  initState() {
    return {
      itemInfo: {
        title: '',
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
      itemInfo: {
        title: json.result.title,
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
