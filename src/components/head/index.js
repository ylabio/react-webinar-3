import {memo} from "react";
import PropTypes from "prop-types";
import Languages from "../languages";
import './style.css';

function Head({title, onChangeLang, lang}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
			<Languages onChangeLang={onChangeLang} lang={lang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
	lang: PropTypes.string,
  onChangeLang: PropTypes.func,
};

Languages.defaultProps = {
  onChangeLang: () => {}
};

export default memo(Head);
