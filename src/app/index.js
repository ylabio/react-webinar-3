import {useCallback, useContext, useEffect, useState} from 'react';
import Main from './main'
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes, Redire } from 'react-router-dom';
import ItemLayout from '../components/item-layout';
import { changeLang } from '../change-lang';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const [language, setLanguage] = useState('ru');

  const activeModal = useSelector(state => state.modals.name);

  return (

    <>
      <BrowserRouter>  
        {activeModal === 'basket' && <Basket language={language}/>}
        <Routes>
          <Route path='/' element={<Main language={language} setLanguage={setLanguage}/>}/>
          <Route path='/post/:id' element={<ItemLayout language={language} setLanguage={setLanguage}/>}/>
          <Route path="*" element={<Main/>}/>
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
