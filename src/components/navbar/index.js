import React, { useContext } from "react";
import './style.css'
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json'

function Navbar() {

    const cn = bem('Navbar')
    const ln = useContext(LanguageContext).ln

    return (
        <div className={cn()}>
            <Link to={'/'}>
                <span className={cn('link')}>{translations[ln].mainLink}</span>
            </Link>
        </div>
    )
}

export default Navbar;