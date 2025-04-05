import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { LanguageContext } from '../../store/context';

function Controls({ onAdd = () => {} }) {
  const { translate } = useContext(LanguageContext);
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{translate('add')}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
