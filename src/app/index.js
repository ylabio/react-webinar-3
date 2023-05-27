import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {CatalogItem} from "../components/catalog-item";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/catalog_item/:id' element={<CatalogItem/>}/>
        </Routes>
      {activeModal === 'basket' && <Basket/>}
    </Router>
  );
}

export default App;
