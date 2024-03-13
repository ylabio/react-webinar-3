import { Route, Routes } from "react-router";
import useSelector from "../store/use-selector";
import Basket from "./basket";
import Details from "./details";
import Main from "./main";

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
        <Route path="/product/:id" element={<Details />} />
        {/* <Route path="*" element={<Main />} /> */}
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
