import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Routes, Route } from 'react-router-dom';
import ItemDetails from '../components/item-details';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={
        <>
          <Main/>
          {activeModal === 'basket' && <Basket/>}
        </>
        }/>
        <Route path="item/:id" 
          element={<ItemDetails activeModal={activeModal}/>}
          />
      </Routes>
    </>
  );
}

export default App;
