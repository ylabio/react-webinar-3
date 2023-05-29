import StoreModule from "../module";

class ItemDescription extends StoreModule {

  initState() {
    return {
      item: {},
      isFetching: false
    }
  }

  async loadItem(id) {
    this.setState({
      ...this.getState(),
      isFetching: true
    })
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       item: {
         _id: json.result._id,
         title: json.result.title,
         description: json.result.description,
         madeIn: {...json.result.madeIn},
         category: {...json.result.category},
         edition: json.result.edition,
         price: json.result.price,
       },
       isFetching: false
    }, 'Загружен товар по id из АПИ');
  }
}

export default ItemDescription;
