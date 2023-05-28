import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Routes, Route } from 'react-router-dom';
import InfoItem from './info-item'

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
        <Route path='/' element={<Main />}/>
        <Route path='/infoItem' element={<InfoItem />}/>
      </Routes>
    </>
  );
}

export default App;
