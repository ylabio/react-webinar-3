import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import langEn from "../../language/en.json";
import langRu from "../../language/ru.json";

function Head({title, setLang}){
  const cn = bem('Head');
  
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('lang')}>
        <button className={cn('btn')} onClick={() => setLang(langRu)}>ru</button>
        <span> | </span>
        <button className={cn('btn')} onClick={() => setLang(langEn)}>en</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  setLang: PropTypes.func.isRequired
};

Head.defaultProps = {
  setLang: () => {}
}

export default memo(Head);
