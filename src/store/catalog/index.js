import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)

  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      product:[]
    }
  }


  async load() {
    const skip = (this.getState().currentPage - 1) * 10;
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pageSize}&skip=${skip}&fields=items(_id,_key,name,title,description,price,madeIn(title,code,_id),category(title,_id),edition),count`);
    const json = await response.json();
    console.log(json)
    const transformedList = json.result.items.map(item => ({
      _id: item._id,
      _key: item._key,
      name: item.name,
      title: item.title,
      description: item.description,
      price: item.price,
      edition: item.edition,
      madeIn: item.madeIn ? {
        title: item.madeIn.title,
        code: item.madeIn.code,
        _id: item.madeIn._id
      } : null,
      category: item.category ? {
        title: item.category.title,
        _id: item.category._id
      } : null
    }));
    this.setState({
      ...this.getState(),
      list: transformedList,
      product: [...this.getState().product, ...transformedList],
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }


  setPage(pageNumber) {
    this.setState({
      ...this.getState(),
      currentPage: pageNumber
    })
  }
}

export default Catalog;
