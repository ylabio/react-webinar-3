import React from 'react';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default React.memo(Head);
