import { Routes, Route} from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ItemDetails from './item-details';
import useSelector from '../store/use-selector';
import { useState } from 'react';
import { translations } from '../utils';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const [language, setLanguage] = useState('ru');
  const listTransfers = translations[language];
  const activeModal = useSelector(state => state.modals.name);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Main language={language} handleLanguageChange={handleLanguageChange} translations={translations} />}
        />
        <Route
          path="/item/:id"
          element={<ItemDetails language={language} handleLanguageChange={handleLanguageChange} translations={translations} />}
        />
      </Routes>
      {activeModal === 'basket' && <Basket language={language} />}
    </div>
  );
}

export default App;
