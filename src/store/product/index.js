import StoreModule from "../module";

class Product extends StoreModule{
    initState() {
        return {
            category:{},
            madeIn: {}
        };
    }

    async info(_id){
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        console.log(json);
        this.setState({
            ...this.getState(),
            ...json.result,
            category: json.result.category,
            madeIn: json.result.madeIn
        }, 'Загружена информация о товаре из АПИ');
    } 
}

export default Product;