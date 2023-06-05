import {Route, Routes} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import {useEffect} from "react";

function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    token: state.user.token,
  }));

  useEffect(() => {
    if (select.token) {
      store.actions.profile.getUserInfo();
    }
  }, [select.token]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
