import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Details from "./details";
import Basket from "./basket";
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
        <Route path="/" element={<Main/>}/>
        <Route path="/product/:id" element={<Details/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
