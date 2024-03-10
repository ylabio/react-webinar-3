import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import {HashRouter} from 'react-router-dom';
import LanguagesProvider from './lang/context';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <HashRouter>
    <StoreContext.Provider value={store}>
      <LanguagesProvider>
        <App/>
      </LanguagesProvider>
    </StoreContext.Provider>
  </HashRouter>
);
