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
        currentPage: 0,
        totalPages: 1,
        itemsPerPage: 10,
      }
    }
  }

  async load(page) {
    try {
      const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10}&fields=items(_id, title, price),count`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        pagination: {
          ...this.getState().pagination,
          totalPages: Math.floor(json.result.count / this.getState().pagination.itemsPerPage),
        }
      }, 'Загружены товары из АПИ + пагинация');
    } catch (error) {
      console.log(error);
    }
  }

     /**
   * Загрузка продукта по id
   * @param id _id продукта в api
   */
  async loadSingleProduct(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: [json.result]
      }, 'Загружен товар из АПИ');
    } catch (error) {
      console.log(error);
    }
  }

   /**
   * Смена текущей страницы каталога
   * @param page страница каталога
   */
   setPage(page) {
    this.setState(
      {
        ...this.getState(),
        pagination: {
          ...this.getState().pagination,
          currentPage: page,
        }
      },
      "Смена страницы каталога"
    );
  }
}

export default Catalog;
