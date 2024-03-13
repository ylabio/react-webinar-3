import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";
import Basket from "./basket";
import Main from "./main";
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
        <Route path="/" element={<Main />} />
        <Route path="/items/:id" element={<Item />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
