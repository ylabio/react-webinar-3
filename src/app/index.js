import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import AboutProduct from './about-product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
	const activeModal = useSelector((state) => state.modals.name);
 

	return (
		<>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/product/:userAboutId" element={<AboutProduct/>}/>
			</Routes>
			{activeModal === 'basket' && <Basket />}
		</>
	);
}

export default App;
