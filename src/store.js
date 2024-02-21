/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.codes = new Set;
        this.state.list.map(item => this.codes.add(item.code));
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
            list: [...this.state.list, {code: this.setCode(), title: 'Новая запись', selectCount: 0}]
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
                if (item.selected) {
                    item.selected = !item.selected;
                }
                if (item.code === code) {
                    item.selected = !item.selected;
                    item.selectCount++;
                    this.setCode();
                }
                return item;
            })
        })
    }

    generateCode(number) {
        const setSizeBefore = this.codes.size;
        const setAfter = this.codes.add(number);
        if (setSizeBefore === setAfter.size) {
            number++;
            this.generateCode(number);
        }
    }

    setCode() {
        let number = this.codes.size + 1;
        this.generateCode(number);
        return Array.from(this.codes).pop();
    }
}

export default Store;
