import StoreModule from "../module";

const baseURL = '/api/v1/articles';

class Card extends StoreModule {

  initState() {
    return {
      card: null,
    }
  }

  async loadCard(id) {
    this.setState({
      card: null
    });

    const response = await fetch(`${baseURL}/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      card: json.result,
    }, 'Загружена карточка товара');
  }
}

export default Card;
