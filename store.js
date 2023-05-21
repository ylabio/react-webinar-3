import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.countPrice = 0;
        this.products = []
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        }
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Добавление новой записи
     */

    addItem() {
        this.setState({
            ...this.state,
            list: [ ...this.state.list, {code: generateCode(), title: 'Новая запись'} ]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        const list = this.state.list.filter(item => item.code !== code);
        const newList = list.map(item => {
            if (item.code > code) {
                item.code--;
            }
            return item;
        });
        this.setState({
            ...this.state,
            // Новый список, в котором не будет удаляемой записи
            list: this.state.list.filter(item => item.code !== code)
        })
    };

    /**
     * Методы для countPrice
     */

    setCountPrice(newCountPrice) {
        this.countPrice = newCountPrice;
        for (const listener of this.listeners) listener();
    }

    /**
     * Методы для products
     */

    setProducts(newProducts) {
        this.products = newProducts;
        for (const listener of this.listeners) listener();
    }
    //Добавление товаров в корзину
    addProduct(product) {
        const isProduct = this.products.some((prod) => prod.title === product.title);

        if (!isProduct) {
            this.setProducts([ ...this.products, {...product, countValue: 1} ]);
            this.setCountPrice(this.countPrice + product.price);
        }else {
            const updatedProducts = this.products.map((prod) => {
                if (prod.title === product.title) {
                    return {...prod, countValue: prod.countValue + 1};
                }
                return prod;
            });

            this.setProducts(updatedProducts);
            this.setCountPrice(this.countPrice + product.price);
        }
    }
    //Удаление товаров из корзины
    removeProduct(product) {
        this.products.map(prod => {
            if (prod.title === product.title) {
                this.setCountPrice(this.countPrice - product.price * prod.countValue)
            }
        })
        this.setProducts(this.products.filter(e => e.code !== product.code))
    }
}

export default Store;
