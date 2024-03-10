import {useEffect, useState, useCallback} from 'react';
import Main from "./main";
import Product from './product';
import Basket from "./basket";
import Error from './error';
import {Routes, Route} from "react-router-dom";
import useSelector from "../store/use-selector";
import {useNavigate} from 'react-router-dom';
import {getTranslater} from '../utils';
import {LanguageContext} from '../contexts';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const [language, setLanguage] = useState('ru')

  const onToggleLanguage = useCallback(() => setLanguage((prev) =>{
    return prev === 'ru' ? 'en' : 'ru';
  }), [language]);

  const activeModal = useSelector(state => state.modals.name);

  const navigate = useNavigate();
  const error = useSelector(
    state => state.catalog.error || state.product.error || state.basket.error
  );
  useEffect(() => {
    if(error) navigate('/error');
  }, [error])

  return (
    <LanguageContext.Provider value={getTranslater(language)} >
      <Routes>
        <Route path="/:page?" element={<Main onToggleLanguage={onToggleLanguage}/>} />
        <Route path="/product/:productId" element={<Product onToggleLanguage={onToggleLanguage}/>} />
        <Route path="/error" element={<Error error={error}/>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </LanguageContext.Provider>
  );
}

export default App;
