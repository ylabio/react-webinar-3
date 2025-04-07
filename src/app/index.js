import { Routes, Route, Navigate } from "react-router";
import Main from './main';
import Basket from './basket';
import AppLayout from '../components/app-layout';
import useSelector from '../store/use-selector';
import Product from '../product';
import ProducPage from "../components/produc-page";
import { STRINGS } from "../const";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const language = useSelector(state => state.catalog.language);
  const text = {
    title: STRINGS.BASKET[language],
    total: STRINGS.TOTAL[language],
    textButton: STRINGS.DELETE[language],
    piece: STRINGS.PIECE[language],
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        {/* <Route element={<AppLayout />}> */}
          <Route 
            path="/page/:currentPage" 
            element={
              <>
                <Main />
                {activeModal === 'basket' && <Basket title={text.title} total={text.total} textButton={text.textButton} piece={text.piece} />}
              </>
            } 
          />
          <Route
            path="/product/:_id" 
            element={
              <>
                <ProducPage />
                {activeModal === 'basket' && <Basket title={text.title} total={text.total} textButton={text.textButton} piece={text.piece} />}
              </>
            } 
          />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;