import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './app/productDetail';
import { LanguagesProvider } from './components/languageSwitcher';
const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
// root.render(
//   <StoreContext.Provider value={store}>
//     <App/>
//   </StoreContext.Provider>
// );
const AppWithRouter = (
 
  <StoreContext.Provider value={store}>
  <LanguagesProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
    </LanguagesProvider>
  </StoreContext.Provider>
  
);

root.render(AppWithRouter);