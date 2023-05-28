import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){
  const language = useSelector(state => state.language.language);
  const label = language === 'RU' ? languageConfig.add.rus : languageConfig.add.eng;

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{label}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
