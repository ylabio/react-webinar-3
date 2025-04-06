import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function MainMenuLayout({ children }) {
  const cn = bem('MainMenuLayout');

  return <div className={cn()}>{children}</div>;
}

MainMenuLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(MainMenuLayout);
