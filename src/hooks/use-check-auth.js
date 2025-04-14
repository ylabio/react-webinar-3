import { useEffect } from 'react';
import useStore from './use-store';

export default function useCheckAuth(dep = []) {
  const store = useStore();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      store.actions.user.checkAuth(token);
    }
  }, dep);
}
