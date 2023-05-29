import {memo} from "react";
import PropTypes from "prop-types";
import Language from "../../components/language";
import './style.css';

function Head({lang, title, onChange}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Language lang={lang} onChange={onChange}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  lang: PropTypes.oneOf(['rus','eng']),
  onChange: PropTypes.func.isRequired,
};

Head.defaultProps = {
  lang: 'rus',
  title: ''
}

export default memo(Head);
