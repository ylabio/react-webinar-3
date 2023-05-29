import React from "react";
import { useContext, memo } from "react";
import { LanguageContext } from "../../store/language";
import './style.css'


function LanguageSwitcher() {

    const { ln, switchLanguage } = useContext(LanguageContext)

    return (
        <div>
            <select className='select' value={ln} onChange={switchLanguage}>
                <option value={"ru"}>Rus</option>
                <option value={"en"}>Eng</option>
            </select>
        </div>
    )
}

export default memo(LanguageSwitcher);