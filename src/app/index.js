import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  console.log('app')
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
