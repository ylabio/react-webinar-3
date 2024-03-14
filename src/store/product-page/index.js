import StoreModule from "../module";

class Product extends StoreModule {
    
    initState() {
        return {
            _id: null,
            title: null,
            description: null,
            price: null,
            madeIn: null,
            madeInCode: null,
            edition: null,
            category: null
        }
    }

    async loadInfo(_id) {
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            ...this.getState(),
            _id: json.result._id,
            title: json.result.title,
            description: json.result.description,
            price: json.result.price,
            madeIn: json.result.madeIn.title,
            madeInCode: json.result.madeIn.code,
            edition: json.result.edition,
            category: json.result.category.title
        }, `Загружены данные о товаре ${_id} из API`);
      }
}

export default Product