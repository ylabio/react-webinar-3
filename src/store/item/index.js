import StoreModule from '../module';

class item extends StoreModule {

  initState() {
    return {
      item: {},
    };
  }

  async loaditem(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result || {},
      },
      'Загружен товар из АПИ',
    );
  }

  setItem(item) {
    this.setState(
      {
        ...this.getState(),
        item: item,
      },
    );
  }
}

export default item;
