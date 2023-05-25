import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {useTranslate} from "../../i18n";

function Head({title, onChangeLang, lang}) {
  const cn = bem('Head');


  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className={cn('lang')}>
        <button onClick={onChangeLang}>{lang}</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  onChangeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default memo(Head);
