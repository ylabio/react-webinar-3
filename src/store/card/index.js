import StoreModule from '../module';

class CardStore extends StoreModule {
  initState() {
    return {
      cardData: {},
      isLoading: false,
      error: false
    }
  }

  /**
   * Запрос информации о товаре к АПИ
   * @param _id Код товара
   */
  async loadCardData(_id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: false
    })

    try {
      const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        cardData: json.result,
        isLoading: false,
        error: false
      }, 'Загружены данные о товаре из АПИ')
    } catch(error) {
      this.setState({
        ...this.getState(),
        cardData: {},
        isLoading: false,
        error: true
      }, `Данные о товаре не загружены из АПИ. Ошибка: ${error}`)
    }
  }
}

export default CardStore;