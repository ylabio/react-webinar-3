import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import DetailPage from "./detail-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Main />} />
        <Route path="/:page" element={ <Main />} />
        <Route path="/product/:id" element={ <DetailPage />} />
      </Routes>
      { activeModal === 'basket' && <Basket /> }
    </Router>
  );
}

export default App;
