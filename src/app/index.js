import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Info from './info';
import { LanguageProvider } from '../localization/language-context'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/info/:itemId" element={<Info/>} />
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </Router>
    </LanguageProvider>
  );
}

export default App;
