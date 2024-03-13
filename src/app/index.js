import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import DetailedPageContainer from "./detailed-page";
import useSelector from "../store/use-selector";
import { LanguageContext } from '../language-provider';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageContext.Consumer> 
      {({ t }) => (
        <Router>
          <Routes>
            <Route path="/" element={<Main t={t} />} />           
            <Route path="/page/:pageNumber" element={<Main t={t} />} />           
            <Route path="/item/:id" element={<DetailedPageContainer t={t} />} /> 
          </Routes>
          {activeModal === 'basket' && <Basket t={t} />}
        </Router>
      )}
    </LanguageContext.Consumer>
  );
}

export default App;