import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HeaderLayout({ children }) {
  return (
    <header className="Header">
      <div className="Header-container">
        {children}
      </div>
    </header>
  );
}

HeaderLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(HeaderLayout);