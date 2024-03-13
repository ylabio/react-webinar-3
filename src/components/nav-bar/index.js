import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";
import { content } from "../../store/translation/content";


function NavBar(props) {
  const cn = bem('NavBar');

  return (
    <nav className={cn()}>
      <Link to={"/"} className={cn('home')} onClick={() => {props.paginate(1)}}>{content[props.lang].main}</Link>
    </nav>
  );
}

NavBar.propTypes = {
  lang: PropTypes.string,
  paginate: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  lang: 'ru',
  paginate: () => {},
}

export default memo(NavBar);

