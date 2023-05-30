import StoreModule from "../module";
import Api from "../../api";

class Description extends StoreModule {

    constructor(store, name) {
        super(store, name);
    }

    initState() {
        return {
            _id: "",
            title: "",
            description: "",
            price: "",
            madeIn: "",
            edition: "",
            category: ""
        };
    }

    async load(id) {
        const {result} = await Api.getItem(id);
        this.setState(result, 'Загружен товар из АПИ');
    }
}

export default Description;