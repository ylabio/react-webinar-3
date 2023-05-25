import PropTypes from 'prop-types';
import { memo } from "react";
import useLanguage from "../../localization/use-language";
import './style.css';

function Controls({onAdd}){

  const ln = useLanguage();

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{ln('buttonAdd')}</button>
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
