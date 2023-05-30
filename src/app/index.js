import {Routes, Route} from 'react-router-dom';

import Main from "./main";
import Basket from "./basket";
import Product from './product';
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
        {activeModal === 'basket' && <Basket/>}
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/product/:id' element={<Product/>}/>
        </Routes>  
    </>
  );
}

export default App;