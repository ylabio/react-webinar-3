/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = [];
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
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
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

    generateUniqueCode() {
        let newCode;
        do {
            newCode = Math.floor(Math.random() * 100) + 1;
        } while (this.state.list.some((item) => item.code === newCode));

        return newCode;
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        const newCode = this.generateUniqueCode();
        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                { code: newCode, title: 'Новая запись' },
            ],
        });
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter((item) => item.code !== code),
        });
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => ({
                ...item,
                selected: item.code === code ? !item.selected : false,
                selectCounter:
                    item.code === code && !item.selected
                        ? (item.selectCounter || 0) + 1
                        : item.selectCounter,
            })),
        });
    }
}

export default Store;
