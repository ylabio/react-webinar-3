import { useState } from 'react';
import useStore from "./use-store";
import {useNavigate} from 'react-router-dom';

function useAuth() {
  const store = useStore();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!store.actions.user.getState().token);

  const token = store.actions.user.getState().token;

  const userName = store.actions.user.getState().profile.userName;

  const login = async (body) => {
    await store.actions.user.auth(body, navigate);
    setIsLoggedIn(!!store.actions.user.getState().token);
  };

  const logout = async () => {
    await store.actions.user.signOut(store.actions.user.getState().token);
    setIsLoggedIn(!!store.actions.user.getState().token);
  };

  return {isLoggedIn, login, logout, token, userName};
}

export default useAuth;
