import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import useStore from '../../store/use-store';
import './style.css';
import { useTranslation } from '../../translation/use-translation';

function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const store = useStore();

  const onMain = useCallback(() => {
    store.actions.catalog.setPage(1);
    navigate('/');
  }, [navigate, store]);

  return (
    <div className="BackButton">
      <Button title={t('main')} onClick={onMain} style="text" />
    </div>
  );
}

export default memo(BackButton);
