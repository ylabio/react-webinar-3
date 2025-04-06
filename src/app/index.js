import Basket from './basket';
import useSelector from '../store/use-selector';
import {Navigate, Route, Routes} from "react-router";
import Main from "./main";
import Article from "./arcicle";
import LangWrapper from "./lang-wrapper";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {


  const activeModal = useSelector(state => state.modals.name);

  return (

    <LangWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/ru"/>}/>
        <Route path="/:lang" element={<Main/>}/>
        <Route path="/:lang/article/:id" element={<Article/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </LangWrapper>

  );
}

export default App;
