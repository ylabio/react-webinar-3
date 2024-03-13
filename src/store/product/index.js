import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {

    }
  }

  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const { result } = await response.json();
    this.setState({
      // ...this.getState(),
      ...result
    }, 'Загружен товар из АПИ')
  }
}

export default Language;
