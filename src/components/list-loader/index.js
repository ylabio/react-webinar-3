import React from 'react';
import './style.css';
import {lang as langData} from '../../lang/data'
import PropTypes from "prop-types";

const ListLoader = ({ isLoading, children, lang }) => {

  return (
    <>
      {isLoading
        ? <div className='ListLoader'>
          {[...new Array(10)].map((_, i) => <div className='ListLoader-item' key={i}>{langData.loader[lang]}</div>)}
        </div>
        : children
      }
    </>
  );
};

ListLoader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  lang: PropTypes.string
}

export default React.memo(ListLoader);
