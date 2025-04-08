import Basket from './basket';
import useSelector from '../store/use-selector';
import Routing from '../components/routing';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routing />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
