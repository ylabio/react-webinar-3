import StoreModule from "../module";

class ItemInfoStore extends StoreModule {
  initState() {
    return {
      itemData: {
        _id: 0,
        title: null,
        description: null,
        madeIn: null,
        madeInCode: null,
        category: null,
        edition: 0,
        price: 0,
      },
    };
  }

  async loadItem(itemId) {
    const response = await fetch(
      `/api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        itemData: {
          ...this.itemData,
          _id: json.result._id,
          title: json.result.title,
          description: json.result.description,
          madeIn: json.result.madeIn.title,
          madeInCode: json.result.madeIn.code,
          category: json.result.category.title,
          edition: json.result.edition,
          price: json.result.price,
        },
      },
      "Загружены товары по id из АПИ"
    );
  }
}
export default ItemInfoStore;
