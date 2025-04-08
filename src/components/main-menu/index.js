import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function MainMenu({ textmain }) {
  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('nav')}>
        {textmain}
      </Link>
    </div>
  );
}

MainMenu.propTypes = {
  textmain: PropTypes.string,
};

export default memo(MainMenu);
