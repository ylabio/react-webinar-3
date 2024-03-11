import StoreModule from "../module";

class CardReducer extends StoreModule {

  initState() {
    return {
      dataCard: {},
      loading: false,
      errorMessage: ''
    }
  }

  async getCard(id) {
    this.setState({
      dataCard: {},
      loading: true,
      errorMessage: ''
    });

    try {
      const responseData = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const data = await responseData.json();

      this.setState({
        dataCard: data.result,
        loading: false,
        errorMessage: ''
      });

    } catch (e) {
      this.setState({
        dataCard: {},
        loading: false,
        errorMessage: 'Данные не удалось загрузить'
      });
    }
  }
}

export default CardReducer;