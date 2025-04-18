import { useEffect, useState } from 'react';
import useStore from './use-store';

export default function useAuth() {
  const store = useStore();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsAuth(store.getState().session?.exists || false);
    };

    updateAuthStatus();
    const unsubscribe = store.subscribe(updateAuthStatus);

    return () => unsubscribe();
  }, [store]);

  return isAuth;
}
