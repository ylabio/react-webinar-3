/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.unicNumber = this.state.list.length; //Начальное значение генератора не должно быть меньше изначальной длины массива
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

    /**
     * Добавление новой записи
     */
    addItem() {
        this.unicNumber++;
        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                { code: this.unicNumber, title: 'Новая запись', selectedCount: 0 },
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
            list: this.state.list.map((item) => {
                if (item.code === code) {
                    //Увеличиваем счетчик выделений, если на элемент кликают, когда он не выделен
                    !item.selected && item.selectedCount++;

                    item.selected = !item.selected;
                } else {
                    //Сбрасываем выделение у всех остальных
                    item.selected = false;
                }
                return item;
            }),
        });
    }
}

export default Store;
