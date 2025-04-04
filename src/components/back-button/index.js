import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import useStore from '../../store/use-store';
import './style.css';

function BackButton() {
  const navigate = useNavigate();
  const store = useStore();

  const onMain = useCallback(() => {
    store.actions.catalog.setPage(1);
    navigate('/');
  }, [navigate, store]);

  return (
    <div className="BackButton">
      <Button title="Главная" onClick={onMain} style="text" />
    </div>
  );
}

export default memo(BackButton);
