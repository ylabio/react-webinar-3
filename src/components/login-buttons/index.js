import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

function LoginButtons(props) {

  const cn = bem('LoginButtons');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={props.link}>{props.title}</Link>
    </div>
  )
}

LoginButtons.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
}

export default memo(LoginButtons);