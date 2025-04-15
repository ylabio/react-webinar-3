import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function HeaderLink({ title, link, onClick = () => {}, style = 'primary', from }) {
  const cn = bem('HeaderLink');
  return (
    <Link to={link} className={cn({ style })} onClick={onClick} state={from}>
      {title}
    </Link>
  );
}

HeaderLink.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
};

export default memo(HeaderLink);
