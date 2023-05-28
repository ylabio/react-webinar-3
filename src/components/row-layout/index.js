import React from 'react';
import './style.css';

const RowLayout = ({ children }) => {
  return (
    <div className={'RowLayout'}>
      {children}
    </div>
  );
};

export default RowLayout;