import {Routes, Route} from "react-router-dom";
import Layout from "../components/layout";
import Main from "./main";
import Details from "./details";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path="/:id" element={<Details/>}/>
      </Route>
    </Routes>
  );
}

export default App;
