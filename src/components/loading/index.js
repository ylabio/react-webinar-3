import PropTypes from "prop-types";
import './style.css';

const Loading = ({ isLoad, children }) => {
  return (
    isLoad ?
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
      : children
  )
};

Loading.propTypes = {
  isLoad: PropTypes.bool,
  children: PropTypes.node
}

export default Loading;