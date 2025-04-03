import React, {useRef, useCallback} from "react";
import useSelector from '../../store/use-selector';
import "./style.css";
import { cn as bem } from '@bem-react/classname'
import useStore from "../../store/use-store";
import { messages } from "../../messages";

function LanguageChanger(){
    const store = useStore();
    const select = useSelector(state => ({
        lang: state.inter.lang,
      }));
    
      const callbacks ={
            changeLang: useCallback(_id => store.actions.inter.changeLang(changerRef.current.value), [store]),
        
      }
    const changerRef = useRef();
    const cn = bem ("Changer");

    const changeLanguageMessage = messages[select.lang].changeLanguage
    
    return (

            <div className={cn()}>
               <p className={cn("show")}>
               {changeLanguageMessage} :  
               </p>
               <div >
               <select value={select.lang} onChange={callbacks.changeLang} className={cn("select")} ref={changerRef}>
                   <option value="ru">ru</option>
                   <option value="en">en</option>
               </select>
               </div>
           </div>
    )
};

export default LanguageChanger;