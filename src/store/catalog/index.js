import {
    codeGenerator
} from "../../utils";
import StoreModule from "../module";
import Api from "../../api";

class Catalog extends StoreModule {

    constructor(store, name) {
        super(store, name);
        this.generateCode = codeGenerator(0);
    }

    initState() {
        return {
            list: [],
            count: 0,
            pageCount: 0
        };
    }

    async load(currentPage, limit = 10) {
        const skip = limit * currentPage;
        const response = await Api.getCatalog(skip, limit);
        const {count, items} = response.result;
        const pageCount = Math.ceil(count / limit);
        this.setState({
        ...this.getState(),
            list: items,
            count,
            pageCount
        }, 'Загружены товары из АПИ');
    }
}

export default Catalog;