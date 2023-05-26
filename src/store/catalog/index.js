import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import store from "../index";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0,
      limit: 10,
      skip: 20
    }
  }

// следующая страница
  nextPage() {
    this.setState({
      ...this.getState(),
      skip : (this.getState().skip + 10)
    })
  }
//предыдущая страница
  prevPage(){
    this.setState({
      ...this.getState(),
      skip : (this.getState().skip - 10)
    })
  }
  //минус 2 страницы
  prevTwoPage(){
    this.setState({
      ...this.getState(),
      skip : (this.getState().skip - 20)
    })
  }
  //плюс 2 страницы
  nextTwoPage(){
    this.setState({
      ...this.getState(),
      skip : (this.getState().skip + 20)
    })
  }
  // первая страница
  goToFirstPage(){
    this.setState({
      ...this.getState(),
      skip : 0
    })
  }
  // последняя страница
  goToLastPage(){
    this.setState({
      ...this.getState(),
      skip : (Math.floor(this.getState().count/this.getState().limit) * this.getState().limit)
    })
  }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`)
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
