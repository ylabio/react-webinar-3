import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/useTranslate';
import './style.css';

function Controls({ onAdd = () => {} }) {
  const t = useTranslate();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{t('add')}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
