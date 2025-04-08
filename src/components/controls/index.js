import { memo } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';
import './style.css';

function Controls({ onAdd = () => {} }) {
  const { language } = useAppContext();

  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{STRINGS.ADD[language]}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
