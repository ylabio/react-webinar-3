import StoreModule from "../module";


class Product extends StoreModule{
    
    async getProduct(id){
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const product = await response.json()
        this.setState({
            ...this.getState(),
            product: product
        })
    }
}

export default Product