import StoreModule from "../module";


class Product extends StoreModule{
    
    initState(){
        return{
            title: "",
            description: "",
            price: 0,
            madeIn: {
                title: "",
                code: "",
            },
            category: {
                title: '',
            }
        }
    }

    async getProduct(id){
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const product = await response.json()
        this.setState({
            ...this.getState(),
            ...product.result
        })
        return product.result
    }
}

export default Product