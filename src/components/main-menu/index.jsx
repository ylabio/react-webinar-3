import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {Link} from "react-router-dom";
import {useLanguage} from "../../LanguageContext";

function MainMenu() {

  const {tr} = useLanguage()

  return (
    <Link to={'/'}>{tr('home')}</Link>
  )
}

MainMenu.PropTypes = {}

export default React.memo(MainMenu);