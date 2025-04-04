import Basket from './basket';
import useSelector from '../store/use-selector';
import {Route, Routes} from "react-router";
import Main from "./main";
import Article from "./arcicle";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {



  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="article/:id" element={<Article/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
