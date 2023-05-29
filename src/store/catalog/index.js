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
      totalGoods: 0,
      isLoading: false,
      limit: 10,  
      pageCurrent: 1
    }
  }

  async load(limit, skip) {
    try {
      this.setState({...this.getState(), isLoading: true}, 'Идёт загрузка товаров из АПИ');
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
      const json = await response.json();
      this.setState({
         ...this.getState(),
         list: json.result.items,
         totalGoods: json.result.count
      }, 'Товары из АПИ получены и сохранены в Store');
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({...this.getState(), isLoading: false}, 'Загрузка товаров из АПИ окончена');
    }
  }
  setPageCurrent(current) {
    this.setState({
      ...this.getState(),
      pageCurrent:  current
    }, 'Установлена текущая страница: ' + current);
  }



}

export default Catalog;
