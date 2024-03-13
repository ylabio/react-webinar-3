import {memo,useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../languages/languagesContext";



function Navigation({toMain}) {

  let { dict } = useContext(LanguageContext)

  const cn = bem('Navigation');
  return (
    <div className={cn()}>
      <NavLink onClick={toMain} className={cn('link')} to="/">{dict.mainPage}</NavLink>
    </div>
  );
}

Navigation.propTypes = {
  toMain:PropTypes.func
};

Navigation.defaultProps = {
  toMain: () => {},
}

export default memo(Navigation);
