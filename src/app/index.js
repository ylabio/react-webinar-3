import Basket from './basket';
import useSelector from '../store/use-selector';
import { routes } from '../routes';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      {routes}
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
