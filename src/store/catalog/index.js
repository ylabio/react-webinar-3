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
      pagination: {
        itemsAmount: null,
        currentPage: 1,
        pagesAmount: 1,
        limitPosts: 10
      },
      isLoading: true,
      isError: false
    }
  }

  async load() {
    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().pagination.limitPosts}&skip=${this.getState().pagination.currentPage * this.getState().pagination.limitPosts - 10}&fields=items(_id, title, price),count`);
      const json = await response.json();
   
      this.setState({
         ...this.getState(),
         list: json.result.items,
         pagination: {
          ...this.getState().pagination,
          itemsAmount: json.result.count,
          pagesAmount: Math.ceil(json.result.count / this.getState().pagination.limitPosts)
         },
         isLoading: false
      }, 'Загружены товары из АПИ');
    } catch (e) {

      this.setState({
        ...this.getState(),
        isError: true,
        isLoading: false
      })

      throw new Error('Error. See details:', e)
    }
  }

  onChangePage(num) {
    if (num <= 0) {
      num = 1;
    }

    this.setState({
      ...this.getState(),
      pagination: {
        ...this.getState().pagination,
        currentPage: num
      },
      isLoading: true
    })
    
    this.load();
  }

}

export default Catalog;
