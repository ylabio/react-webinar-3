import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import {getProductList} from "../../api";

const NUMBER_OF_PRODUCT_PER_PAGE = 10;

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 0,
      lastPage: 0,
      isLoading: false
    }
  }

  async load(newPage = null) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true
      });
      const page = newPage === null ? this.getState().page : newPage;
      const limit = NUMBER_OF_PRODUCT_PER_PAGE;
      const skip = page * NUMBER_OF_PRODUCT_PER_PAGE;
      const productListData = await getProductList(limit, skip);
      const list = productListData.items;

      const lastPage = Math.ceil(productListData.count / NUMBER_OF_PRODUCT_PER_PAGE) - 1;

      this.setState({
        ...this.getState(),
        list,
        page,
        lastPage
      }, 'Загружены товары из АПИ');
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false
      });
    }
  }
}

export default Catalog;
