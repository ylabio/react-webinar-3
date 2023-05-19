import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, action, actionTitle }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {action && <button onClick={action}>{actionTitle}</button>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  action: PropTypes.func,
  actionTitle: PropTypes.string,
};

export default React.memo(Head);
