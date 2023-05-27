import StoreModule from "../module";


class Card extends StoreModule {
    initState() {
        return {
          card: {}
        }
    }
    async loadingCard(id) {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const json = await response.json();
        this.setState({
            ...this.getState(),
            card: json.result,
         }, 'Загружена карточка товара');
    }
    
}

export default Card;