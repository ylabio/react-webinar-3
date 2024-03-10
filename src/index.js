import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
<<<<<<< HEAD
import {BrowserRouter} from "react-router-dom";
import {LanguageProvider} from "./language-provider";
=======
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
<<<<<<< HEAD
    <LanguageProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </LanguageProvider>
=======
    <App/>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
  </StoreContext.Provider>
);
