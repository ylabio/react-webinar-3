import React from 'react';
import "./style.css";

const Load = ({ valueLang }) => {
  return (
    <div className='Load'>
      { valueLang ? 'Загрузка...' : 'Loading...' }
    </div>
  );
};

export default Load;
