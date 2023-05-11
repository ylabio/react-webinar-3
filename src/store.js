import { findMaxId } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.currentId = findMaxId(this.state.list);
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

    // метод для увеличения ID. Думаю это не совсем правильное решение, надеюсь вы подскажете :))
    increaseId() {
        this.currentId += 1;
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        this.increaseId(); // увеличваем ID

        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                { code: this.currentId, title: "Новая запись" },
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
                // устанавливаем для каждого элемента свойство selectedCount
                if (!item.selectedCount) item.selectedCount = 0;

                // снимаем выделение у всех элементов, у которых не совпадает id
                if (item.code !== code) {
                    item.selected = false;
                }

                if (item.code === code) {
                    // увеличиваем свойство selectedCount
                    if (!item.selected) item.selectedCount += 1;

                    item.selected = !item.selected;
                }

                return item;
            }),
        });
    }
}

export default Store;
