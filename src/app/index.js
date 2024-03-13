import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import AboutOrder from './about-order';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}/>  
          <Route path='/order/:id' element={<AboutOrder />}/>
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default App;
