import {Store} from "./index";

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', price: 100.0 },
    { code: 2, title: 'Книга про React', price: 770 },
    { code: 3, title: 'Конфета', price: 33 },
    { code: 4, title: 'Трактор', price: 7955320 },
    { code: 5, title: 'Телефон iPhone XIXV', price: 120000 },
    { code: 6, title: 'Карандаши цветные', price: 111 },
    { code: 7, title: 'Товар сюрприз', price: 0 },
  ],
});

export {store}
