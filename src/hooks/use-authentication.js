import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from './use-selector';

export default function useAuthentication() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (!select.user.username && !select.waiting) {
      navigate('/login');
    }
  }, [select.user, select.waiting, navigate]);
}
