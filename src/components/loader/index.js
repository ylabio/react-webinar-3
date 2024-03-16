import './style.css';
import PropTypes from 'prop-types';

function Loader({active, children}) {

    if (active) {
      return <div className="Loader" />
    } else {
      return children;
    }
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Loader.defautlProps = {

}

export default Loader;