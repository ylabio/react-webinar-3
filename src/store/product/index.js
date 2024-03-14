import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      item: null,
      loading: false
    }
  }

  async getItem(_id) {
    try {
      this.setState({
        ...this.getState(),
        loading: true,
      }, 'Зазгрузка данных товара начата')

      const res = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`)
      const json = await res.json()

      this.setState({
        ...this.getState(),
        item: json.result
      }, 'Продукт получен по АПИ')
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({
        ...this.getState(),
        loading: false,
      }, 'Зазгрузка данных товара завершена')
    }
  }
}

export default Product;