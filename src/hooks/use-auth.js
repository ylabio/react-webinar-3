import {useEffect} from 'react';
import useStore from './use-store';

export default function useAuth() {
    const store = useStore()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            store.actions.auth.sessionRecovery();
        }
      }, []);
}
