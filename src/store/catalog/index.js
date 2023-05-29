import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
    constructor(store, name) {
        super(store, name);
        this.generateCode = codeGenerator(0);
    }

    initState() {
        return {
            list: [],
            totalPages: 1,
            currentPage: 1,
            currentProduct: {}
        };
    }

    async load(currentPage) {

        const limit = 10;

        const response = await fetch(
            `/api/v1/articles?limit=${limit}&skip=${(currentPage - 1)*limit}&fields=items(_id, title, price),count`,
        );
        const json = await response.json();
        
        this.setState(
            {
                ...this.getState(),
                list: json.result.items,
                totalPages: Math.ceil(json.result.count / limit),
            },
            'Загружены товары из АПИ',
        );
    }

    async loadProduct(productId) {

        const response = await fetch(
            `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`,
        ); 
        const json = await response.json();
        console.log(json)
        this.setState(
            {
                ...this.getState(),
                currentProduct: {
                    title: json.result.title,
                    descr: json.result.description,
                    country: `${json.result.madeIn.title} (${json.result.madeIn.code})`,
                    category: json.result.category.title,
                    year: (new Date(json.result.dateCreate)).getFullYear(),
                    price: json.result.price
                }
            },
            'Загружен текущий товар',
        );
    }

    setCurrentPage(page) {
        this.setState(
            {
                ...this.getState(),
                currentPage: page
            },
            'Изменена страница',
        );
    }
}

export default Catalog;
