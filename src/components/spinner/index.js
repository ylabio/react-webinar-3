import { memo } from 'react';
import './style.css';
import useTranslation from '../../hooks/use-translation';

function Spinner() {
  const { t } = useTranslation();
  return <div className="Spinner">{t('spinner text')}</div>;
}

export default memo(Spinner);
