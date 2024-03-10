import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import Article from "./article";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  console.log('App');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="article/:articleId" element={<Article/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
