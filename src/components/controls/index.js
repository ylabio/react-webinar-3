import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  const { locale } = useSelector(state => ({
    locale: state.i18n.locale
  }))
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{locale.Add}</button>
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
