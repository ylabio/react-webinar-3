import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router-dom';
import Good from './good';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} /> 
        <Route path='/good/:id' element={<Good />} /> 
        <Route path='*' element={<Main />} /> 
      </Routes>
      
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
