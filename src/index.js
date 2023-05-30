import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {StoreContext} from "./store/context";

import App from './app';
import Store from "./store";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App/>  
    </BrowserRouter>
  </StoreContext.Provider>
);
