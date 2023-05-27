//import {useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/main';
import Article from './pages/article';
import Basket from './basket';
import NotFound from './pages/not-found';
//import useStore from "../store/use-store";
import useSelector from '../store/use-selector';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route index path='/' element={<Main/>}/>
          <Route path='/article/:id' element={<Article/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </Router>
    </>
  );
}

export default App;
