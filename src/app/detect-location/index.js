import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/use-store';


export default function DetectLocation() {
  const location = useLocation();

  const store = useStore();

  useEffect(() => {
    store.actions.modals.close();
  }, [location]);

  return null;
}
