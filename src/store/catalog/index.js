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
      itemsCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      currentProduct: null,
      listIsLoading: false,
      productIsLoading: true,
    };
  }

  async loadCatalog({ skip, limit }) {
    this.setState({
      ...this.getState(),
      listIsLoading: true,
    });

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    );
    const { result } = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: result.items,
        itemsCount: result.count,
        listIsLoading: false,
      },
      "Загружены товары и их количество из АПИ"
    );
  }
  async loadFullProductData(productId) {
    this.setState({
      ...this.getState(),
      productIsLoading: true,
    });

    const response = await fetch(
      `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`
    );
    const { result } = await response.json();

    this.setState({
      ...this.getState(),
      currentProduct: { ...result },
      productIsLoading: false,
    });
  }

  changePage(pageNumber) {
    this.setState({ ...this.getState(), currentPage: pageNumber });
  }

  setProductIsLoading() {
    this.setState({ ...this.getState(), productIsLoading: true });
  }
}

export default Catalog;
