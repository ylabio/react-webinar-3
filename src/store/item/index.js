import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Item extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      _id: null,
      title: null,
      description: null,
      country: null,
      countryCode: null,
      category: null,
      year: null,
      price: null,
      isLoading: false,
    };
  }

  async load(id) {
    this.setState({ ...this.getState(), isLoading: true });
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const { result } = await response.json();

    this.setState({
      _id: result._id,
      title: result.title,
      description: result.description,
      country: result.madeIn.title,
      countryCode: result.madeIn.code,
      category: result.category.title,
      year: result.edition,
      price: result.price,
      isLoading: false,
    });
  }
}

export default Item;
