import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Head({title, selectLang, lang}){
  const cn = bem('Head');
  const onChange=(e)=>{
    selectLang(e.target.value)
  }
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn("lang")}>
        <label><input type="radio" name ="lang" value="ru" onChange={onChange} checked={lang == "ru"}/>рус</label>
        <label><input type="radio" name ="lang" value="en" onChange={onChange} checked={lang == "en"}/>eng</label>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  selectLang: PropTypes.func
};

export default memo(Head);
