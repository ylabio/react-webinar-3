import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import DetailsInfo from "./details-info";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/details/:id" element={<DetailsInfo />} />
        </Routes>
        {activeModal === "basket" && <Basket />}
      </Router>
    </>
  );
}

export default App;
