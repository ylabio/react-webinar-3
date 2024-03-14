import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 1,
      result: {}
    };
  }

  async load(page = 1, position = 0) {
    const limit = 10;
    const skip = (page - 1) * limit + position; // Вычисляем текущую позицию на странице
    const currentPosition = currentPosition - (limit * (page - 1)); // учитываем позицию при расчете смещения
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&position=${currentPosition}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    const list = json.result.items;
    const totalPages = Math.ceil(json.result.count / limit);

    this.setState(
      {
        ...this.getState(),
        list,
        currentPage: page,
        totalPages,
        currentPosition:position,
      },
      "Загружены товары из АПИ"
    );
  }
  
}

export default Catalog;
