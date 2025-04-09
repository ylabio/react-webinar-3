import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import text from '../../text';
import useSelector from '../../store/use-selector';

function Controls({ onAdd = () => {} }) {
  const select = useSelector(state => ({
    lang: state.language.language || 'ru',
  }))

  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{text[select.lang].addButton}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
