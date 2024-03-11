import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import Home from "./home";
import SingleProduct from "./single-product";
import PageLayout from "../components/page-layout";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/articles/:id' element={<SingleProduct/>}/>
        </Routes>
      </PageLayout>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
