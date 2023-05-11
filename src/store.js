import {getSelectedCounter} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = {
            list: initState.list.map((item) => {
                /*дефолтный счетчик*/
                item.selectCounterNumber = 0;
                return item;
            }),
            /*уникальный счетчик, включая удаленные записи*/
            itemsCounter: initState.list.length
        }

        ;
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
    addItem() {
        let uniqieCode = this.state.itemsCounter + 1;
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: uniqieCode, title: 'Новая запись'}],
            /*увеличиваем уникальный счетчик, включая удаленные записи*/
            itemsCounter: uniqieCode
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
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.selected = !item.selected;
                 //   getSelectedCounter(item.selectCounterNumber)

                    // Увеличение значения счётчика выделения записи
                    if (item.selected) {
                        item.selectCounterNumber += 1;
                    }


                } else {
                    item.selected = false;
                }
                return item;
            })
        })
    }
}

export default Store;
