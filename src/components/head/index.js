import React from 'react';

import PropTypes from 'prop-types';

import './style.css';

function Head({ title, styleClass }) {
  return (
    <div className={styleClass ? `Head ${styleClass}` :'Head'}>
      <div className="Head-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  styleClass: PropTypes.string,
};

export default React.memo(Head);
