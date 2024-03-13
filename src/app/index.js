import Main from "./main";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./product-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
