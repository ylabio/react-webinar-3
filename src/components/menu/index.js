import React, {memo, useContext} from 'react'
import {Link} from "react-router-dom";
import {LanguageContext} from "../../language-provider.js";
import './style.css';
import {cn as bem} from "@bem-react/classname";

const Menu = () => {

  const cn = bem('Menu');

  const { wordsTranslate } = useContext(LanguageContext);

  return (
    <Link to='/' className={cn("link")}>
      {wordsTranslate("home")}
    </Link>
  )
}
export default memo(Menu);
