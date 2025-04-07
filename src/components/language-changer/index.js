import React, {memo, useRef} from "react";
import "./style.css";
import { cn as bem } from '@bem-react/classname'
import PropTypes from 'prop-types';


function LanguageChanger({lang , changeLanguageMessage, changeLang = ()=>{},}){

    const changerRef = useRef();
    const cn = bem ("Changer");
    function handleChangeFunction(){
        changeLang(changerRef.current.value)
    }
    return (

            <div className={cn()}>
               <p className={cn("show")}>
               {changeLanguageMessage} :  
               </p>
               <div >
               <select value={lang} onChange={handleChangeFunction} className={cn("select")} ref={changerRef}>
                   <option value="ru">ru</option>
                   <option value="en">en</option>
               </select>
               </div>
           </div>
    )
};

export default memo(LanguageChanger);

LanguageChanger.propTypes = {
  lang: PropTypes.string,
  changeLanguageMessage: PropTypes.string,
};
