import {useEffect, useState, useCallback} from 'react';
import Main from "./main";
import Product from './product';
import Basket from "./basket";
import Error from './error';
import {Routes, Route} from "react-router-dom";
import useSelector from "../store/use-selector";
import {useNavigate} from 'react-router-dom';
import {getTextData} from '../utils';
import {TextDataContext} from '../contexts';
import {APP_PATHS} from '../constants';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const [textDataQuery, setTextDataQuery] = useState('ru')

  const onChangeTextDataQuery = useCallback((query) => setTextDataQuery(query), [textDataQuery]);

  const activeModal = useSelector(state => state.modals.name);

  const navigate = useNavigate();
  const error = useSelector(
    state => state.catalog.error || state.product.error || state.basket.error
  );
  useEffect(() => {
    if(error) navigate('/error');
  }, [error])

  return (
    <TextDataContext.Provider value={getTextData(textDataQuery)} >
      <Routes>
        <Route path={APP_PATHS.CATALOG + ":page?"}
               element={<Main onChangeTextDataQuery={onChangeTextDataQuery}/>} />
        <Route path={APP_PATHS.PRODUCT + ":productId"}
               element={<Product onChangeTextDataQuery={onChangeTextDataQuery}/>}
        />
        <Route path={APP_PATHS.ERROR} element={<Error error={error}/>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </TextDataContext.Provider>
  );
}

export default App;
