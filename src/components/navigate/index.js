import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import translate from "../../app/language/translate.json";
import {useLangContext} from "../../store/use-lang-context"

const Navigate = () => {
  const cn = bem('Navigate');
  const {language} = useLangContext();

  return <div className={cn()}>
    <Link to={`/`}>
      {translate.Home[language]}
    </Link>
  </div>;
};

export default Navigate;