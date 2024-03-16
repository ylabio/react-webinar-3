import PropTypes from 'prop-types';
import './style.css';

function Toggler({checked, onChange}) {
return(
    <input className="Toggler" type="checkbox" checked={checked} onChange={onChange} />
  )
}

Toggler.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default Toggler;
