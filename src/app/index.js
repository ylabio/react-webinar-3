import { Routes, Route} from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ItemDetails from './item-details';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </div>
  );
}

export default App;
