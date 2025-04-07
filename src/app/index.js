import useSelector from '../store/use-selector';
import Basket from './basket';
import { Routes, Route } from 'react-router';
import Main from './main';
import ItemPage from './item-page';

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:itemId" element={<ItemPage />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
