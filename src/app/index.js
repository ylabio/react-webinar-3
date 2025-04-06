import { router } from "../routing/router";
import { RouterProvider } from "react-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
