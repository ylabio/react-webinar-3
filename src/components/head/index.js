import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, variant = 'default' }) {
  const headingClass = variant === 'modal' ? 'modal-heading' : 'Head';
  const containerClass = variant === 'modal' ? 'modal-heading-container' : 'Head-container';
  
  return (
    <div className={headingClass}>
      <div className={containerClass}>
        <h1 style={variant === 'modal' ? { color: 'var(--main-text)' } : {}}>
          {title}
        </h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'modal'])
};

export default React.memo(Head);
