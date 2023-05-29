import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <div className='Head-wrap-button'>
      <button className='Head-button' onClick={() => props.changeLang('en')}>en</button>
      <button className='Head-button' onClick={() => props.changeLang('ru')}>ru</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  changeLang: PropTypes.func,
};

Head.defaultProps = {
  changeLang: () => {},
}

export default memo(Head);
