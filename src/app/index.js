import {
  Route,
  Routes,
} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Item from "./item";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/catalog/:id"} element={<Main />} />
        <Route path={"/articles/:id"} element={<Item />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
