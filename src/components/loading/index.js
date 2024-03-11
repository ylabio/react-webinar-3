import loaderGif from '../../images/loaderGif.gif';
import PropTypes from "prop-types";
import './style.css';

const Loading = ({loading, children}) => {
  return (
    loading ?
      <div className='wrapper'>
        <img className='loading' src={ loaderGif } alt='Загрузка'/>
      </div> : children
  )
};

Loading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node
}

export default Loading;