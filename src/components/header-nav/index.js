import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function HeaderNav(props) {
  const cn = bem('HeaderNav');

  return (
    <div className={cn()}>
      <Link to={props.link} className={cn('username')}>
        {props.username}
      </Link>
      <button className={cn('btn')} onClick={props.onLogOut}>
        {props.btnLabel}
      </button>
    </div>
  );
}

HeaderNav.propTypes = {
  link: PropTypes.string.isRequired,
  btnLogin: PropTypes.string,
  onLogOut: PropTypes.func,
};

HeaderNav.defaultProps = {
  btnLogin: 'Выйти',
  onLogOut: () => {},
};

export default memo(HeaderNav);
