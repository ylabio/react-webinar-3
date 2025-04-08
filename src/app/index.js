import Basket from './basket';
import useSelector from '../store/use-selector';
import { Navigate, Route, Routes, useLocation } from "react-router";
import Main from "./main";
import Article from "./arcicle";
import { useEffect } from 'react';
import { DEFAULT_LANG, OPTIONS_LANG } from '../constants';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const location = useLocation();
  const rawLang = location.pathname.split('/')[1];
  const lang = OPTIONS_LANG.includes(rawLang) ? rawLang : DEFAULT_LANG;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}`} replace/>}/>
        <Route path="/:lang" element={<Main/>}/>
        <Route path="/:lang/article/:id" element={<Article/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
