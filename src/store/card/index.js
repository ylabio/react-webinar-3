import StoreModule from "../module";

class Card extends StoreModule {

  initState() {
    return {
      cardData: {}
    }
  }

  async loadCard(id) {
		try {
			const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

			this.setState({
				...this.getState(),
				cardData: json.result
			});

		} catch (e) {
				console.log(e)
				this.setState({
					...this.getState(),
					cardData: {}
				});
		}
  }
}

export default Card;