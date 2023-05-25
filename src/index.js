import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";

<<<<<<< HEAD
const store = new Store({
  list: [
    {code: generateCode(), title: 'Название товара', price: 100.0},
    {code: generateCode(), title: 'Книга про React', price: 770},
    {code: generateCode(), title: 'Конфета', price: 33},
    {code: generateCode(), title: 'Трактор', price: 7955320},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: generateCode(), title: 'Карандаши цветные', price: 111},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
  ],
  cart : []
});
=======
const store = new Store();
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <App/>
  </StoreContext.Provider>
);
