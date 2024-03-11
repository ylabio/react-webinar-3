import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {lang as langData} from '../../lang/data'

function Head({title, lang, inItemPage}) {
  return (
    <div className='Head'>
      <h1>
        {inItemPage
          ? title
          : lang === 'ru' ? langData.headers.main.ru : langData.headers.main.en
        }
      </h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string
};

export default memo(Head);
