import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LoginBtn(props) {
  const cn = bem('LoginBtn');

  return (
    <Link to={props.link} className={cn()}>
      {props.btnLogin}
    </Link>
  );
}

LoginBtn.propTypes = {
  link: PropTypes.string.isRequired,
  btnLogin: PropTypes.string,
};

LoginBtn.defaultProps = {
  btnLogin: 'Войти',
};

export default memo(LoginBtn);
