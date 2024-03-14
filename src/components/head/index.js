import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {lang as langData} from '../../lang/data'

function Head({title, lang, inProductPage}) {
  return (
    <div className='Head'>
      <h1>
        {inProductPage
          ? title
          : langData.headers.main[lang]
        }
      </h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  inProductPage: PropTypes.bool
};

export default memo(Head);
