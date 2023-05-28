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
      loading: false,
      total: 1,
      err: ''
    }
  }

  async load(currentPage) {
    const limit = 10;
    this.setState({
      ...this.getState(),
      loading: true
    }, 'Загрузка...');
    const skip = currentPage === 1 ? (currentPage - 1) * limit : (currentPage - 1) * limit - 1;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const newList = json.result.items;
    const total = Math.ceil(json.result.count / limit);
    const newState = {
      ...this.getState(),
      list: newList,
      total: total,
      loading: false
   }
    if (!newList.length) {
      newState['err'] = 'Неверный запрос';
    } else {
      newState['err'] = '';
    }
    this.setState(newState, 'Загружены товары из АПИ');
  }
}


export default Catalog;
