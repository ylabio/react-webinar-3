import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {useLanguage} from "../../hooks";

function Controls({onAdd}) {
  const {t} = useLanguage()

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{t("Add")}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {
  }
}

export default memo(Controls);
