import React, {useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import langRu from "../language/ru.json";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const [idProduct, setIdProduct] = useState('');
  const [lang, setLang] = useState(langRu);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/"
               element={<Main setIdProduct={setIdProduct} lang={lang.main}
                              setLang={setLang}/>}/>
        <Route path="/product/:id"
               element={<Product idProduct={idProduct} lang={lang.product}
                                 setLang={setLang}/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket setIdProduct={setIdProduct}
                                           lang={lang.basket} setLang={setLang}/>}
    </BrowserRouter>
  );
}

export default App;
