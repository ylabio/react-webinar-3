import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Main />
        {activeModal === 'basket' && <Basket />}
      </Router>
    </>
  );
}

export default App;
