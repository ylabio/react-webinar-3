import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Good extends StoreModule {
    constructor(store, name) {
        super(store, name);
        this.generateCode = codeGenerator(0)
    }

    initState() {
        return {
            title: null,
            description: null,
            madeInTitle: null,
            madeInCode: null,
            category: null, 
            edition: null,
            price: null,
        }
    }

    async load(id) {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const json = await response.json();

        this.setState({
            ...this.getState(),
            title: json.result.title,
            description: json.result.description,
            madeInTitle: json.result.madeIn.title,
            madeInCode: json.result.madeIn.code,
            category: json.result.category.title,
            edition: json.result.edition,
            price: json.result.price 
        })
    }
}

export default Good;