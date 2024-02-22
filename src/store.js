/**
 * Хранилище состояния приложения
 */
class Store {
    #arrNumbers; // создал отдельное поле, в котором храню массив кодов

    constructor(initState = {}) {
        this.#arrNumbers = initState.list.map(el => el.code)// поместил все коды в массив
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
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
    // addItem() {
    //   this.setState({
    //     ...this.state,
    //     list: [...this.state.list, {code: this.state.list.length + 1, title: 'Новая запись'}]
    //   })
    // };

    codeGenerator() {
        let maxNumber = Math.max(...this.#arrNumbers) // вычисляю максимальное значение кода в массиве
        const randomCode = maxNumber + 1; // просто прибавляю единицу к максимальному числу
        this.#arrNumbers.push(randomCode);// и пушу в массив
        return randomCode; // возвращаю число, которое всегда будет больше на единицу самого большого значения имеющихся кодов.
    }


    addItem() {
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: this.codeGenerator(), title: 'Новая запись'}]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter(item => item.code !== code)
        })
    };

    /**
     * Выделение записи по коду
     * @param code
     */
    // selectItem(code) {
    //   this.setState({
    //     ...this.state,
    //     list: this.state.list.map(item => {
    //       if (item.code === code) {
    //         item.selected = !item.selected;
    //       }
    //       return item;
    //     })
    //   })
    // }
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.selected = !item.selected;
                } else if (item.code !== code) { // теперь всё гаснет кроме выделенного.
                    item.selected = false
                }
                return item;
            })
        })
    }
}

export default Store;
