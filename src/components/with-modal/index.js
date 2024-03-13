import PropTypes from 'prop-types';
import Basket from '../../app/basket';

function WithModal(props) {
  return (
    <>
      { props.children }
      { props.activeModal === 'basket' && <Basket/> }
    </>
  )
}

WithModal.propTypes = {
  activeModal: PropTypes.string,
  children: PropTypes.node
};

WithModal.defaultProps = {
  activeModal: ''
}

export default WithModal;