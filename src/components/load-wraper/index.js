import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LoadWrapper({isLoading, children, lang}) {
  console.log(children.lang)
  return (
    <div className='LoadWrapper'>
      {isLoading ? <h1>{lang === 'ru-RU' ? 'Загрузка...' : 'Loading...'}</h1> : children}
    </div>
  );
}

LoadWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,

};

export default LoadWrapper;