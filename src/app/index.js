import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import ProfileTool from "../components/profile-tool";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const navigate = useNavigate()

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    user: state.user.user,
    token: state.user.token,
  }));

  const callbacks = {
    onProfileAction: useCallback(() => {
      if(select.token) {
      console.log(select.token)
        navigate('/')
        return store.actions.user.logout()
      }

      if(!select.token) {
        return navigate('/login')
      }
    }, [store, select.token]),
    check: useCallback(() => store.actions.user.check(), [store])
  }

  useEffect(() => {
    callbacks.check()
  },[])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main>
          <ProfileTool
            isLoggedin={Boolean(select.token)}
            path={'/profile'}
            userName={select.user.profile?.name}
            onClick={callbacks.onProfileAction}
          />
        </Main>}/>
        <Route path={'/articles/:id'} element={<Article>
          <ProfileTool
            isLoggedin={Boolean(select.token)}
            path={'/profile'}
            userName={select.user.profile?.name}
            onClick={callbacks.onProfileAction}
          />
        </Article>}/>
        <Route path={'/login'} element={<Login>
          <ProfileTool
            isLoggedin={Boolean(select.token)}
            path={'/profile'}
            userName={select.user.profile?.name}
            onClick={callbacks.onProfileAction}
          />
        </Login>}/>
        <Route path={'/profile'} element={<Profile>
          <ProfileTool
            isLoggedin={Boolean(select.token)}
            path={'/profile'}
            userName={select.user.profile?.name}
            onClick={callbacks.onProfileAction}
          />
        </Profile>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
