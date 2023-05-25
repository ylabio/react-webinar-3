import {appRouterConfig} from "./config";
import {Route, Routes} from "react-router-dom";

export function AppRouter() {
  return (
    <Routes>
      {appRouterConfig.map(route => (
        <Route
          key={route.id}
          path={route.path}
          element={<route.component/>}
        />
      ))}
    </Routes>
  )
}
