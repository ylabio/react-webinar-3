/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
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
        console.log(this.state)
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }


    /**
     * Добавление новой записи
     */
    addItem() {
        const uniqueCode = Math.random()
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: uniqueCode, title: 'Новая запись', count: 0}]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        //ищем индекс удаляемого элемента
        const findedIndexDeleteItem = this.state.list.findIndex(item => item.code === code)
        // удаляем элемент
        const filtredList = this.state.list.filter(item => item.code !== code)
        //устанвавливаем свойство selected, если отфильтрованный массив не пустой массив
        if (filtredList.length > 0) {
            // меняем свойство selected на true у элемента массива, который встал на его место или перед ним
            filtredList.length > findedIndexDeleteItem
                ? filtredList[findedIndexDeleteItem].selected = true
                : filtredList[findedIndexDeleteItem - 1].selected = true
        }

        this.setState({
            ...this.state,
            list: filtredList
        })
    };

    /**
     * счетчик
     * @param code
     */
    countItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code && item.selected) {
                    item.count += 1;
                }
                return item;
            })
        })
    };

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.selected = !item.selected;
                } else {
                    item.selected = false
                }
                return item;
            })
        })
    }
}

export default Store;
