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
      count: 0, // для общего количества item
      pagesCount: 0,
      activePage: 0,
      limit: 10,
      skip: 0,
      isFetching: false
    }
  }

  async load(limit, skip) {
    this.setState({
      ...this.getState(),
      isFetching: true
    })
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       count: json.result.count,
       pagesCount: Math.ceil(json.result.count / limit),
       activePage: Math.floor(skip / limit) + 1,
       isFetching: false
    }, 'Загружены товары из АПИ');
  }

  setSkip (value) {
    this.setState({
      ...this.getState(),
      skip: value
    },'Изменение значения Skip');
  }
}

export default Catalog;
