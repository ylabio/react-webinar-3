import './style.css';
import PropTypes from 'prop-types';

const Modal = ({ children, visible, setVisible }) => {
  const rootClasses = ['Modal'];
  if (visible) {
    rootClasses.push('active');
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className='Modal-content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
}

Modal.defaultProps = {
    setVisible: () => {},
}
export default Modal;
