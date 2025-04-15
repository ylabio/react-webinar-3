import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';

import UserPanel from '../components/user-panel';
import PrivateRoute from '../containers/private-rote';
import ProfileContainer from '../containers/profile';

function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    const token = store.getState().auth.token;
    if (token) {
      store.actions.auth.fetchProfile();
    }
  }, []);

  return (
    <>
      <UserPanel />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileContainer />
            </PrivateRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
