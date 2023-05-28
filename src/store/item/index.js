import StoreModule from '../module';

class Item extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {},
    };
  }

  clear() {
    this.setState({...this.getState(), ...this.initState()});
  }

  async loadItem(id) {
    console.log('GFDGSDFGSFD');
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    console.log(json.result);
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      'Загружена страница товара из АПИ'
    );
  }
}

export default Item;
