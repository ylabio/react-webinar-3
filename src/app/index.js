import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import InfoCard from "./info-card";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/info/:id" element={<InfoCard />}/>
      </Routes>
      {activeModal === "basket" && <Basket/>} 
    </>
  );
}

export default App;
