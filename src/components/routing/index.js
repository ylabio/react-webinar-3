import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../../app//main'; // Главная страница
import ProductPage from '../../app/product-page'; // Страница товара

function Routing() {
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
    // </Router>
  );
}

export default Routing;
