import {Routes, Route} from "react-router-dom";
import {AppRoute} from "../const";
import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import PageNotFound from "../components/page-not-found";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.RootCatalog} element={<Main/>}/>
        <Route path={AppRoute.Product} element={<Product/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
