import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {translate} from "../../utils";
import {LanguageContext} from "../../store/context";
import 'style.css';

const Navigation = () => {
  const activeLanguage = useContext(LanguageContext)

  return (
    <nav className={'Navigation'}>
      <NavLink
        to={'/'}
        className={'Navigation-link'}
      >
        {translate('main', activeLanguage)}
      </NavLink>
    </nav>
  );
};

export default Navigation;