import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { useTranslate } from "../../translate";
import {cn as bem} from '@bem-react/classname';
function Head({title}) {
  const {setLanguage}=useTranslate()
  const cn = bem('Head');
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn()+'-Language'} style={{}}>
        <div onClick={()=>setLanguage('ru-RU')}>RU</div><div onClick={()=>setLanguage('en-EN')}>EN</div></div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
