import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { AppRoute } from "../../const";

const dictionary = {
  rus: {
    main: 'Главная',
  },
  eng: {
    main: 'Main',
  }
}

function Navigation({lang}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={AppRoute.Main} className={cn('home')}>{dictionary[lang].main}</Link>
    </div>
  );
}

Navigation.propTypes = {
  lang: PropTypes.oneOf(['rus', 'eng']),
};

Navigation.defaultProps = {
  lang: 'rus',
}

export default memo(Navigation);
