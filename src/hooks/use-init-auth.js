import { useCallback,useEffect } from "react";
import useStore from './use-store';
import { getUser } from "../store/authentication";
export default function useInitAuth() {
    const store = useStore();
    const initialize = useCallback(async () => {
      try {
        const userData = await getUser();
        store.actions.auth.initAuth({
          name: userData.profile.name,
          isLogin: true
        });
        store.actions.user.getUser({user:{
          name: userData.profile.name,
          phone: userData.profile.phone,
          email: userData.email
        }});
      } catch (error) {
        console.error('Ошибка инициализации: требуется повторный вход');
      }
    }, [store]);
  
    useEffect(() => {
      initialize();
    }, [initialize]);
    }
   