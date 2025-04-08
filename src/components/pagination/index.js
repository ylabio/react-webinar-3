import React, { useState } from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function Pagination({limit=10, activePage=1}) {

  const countItem = 542;
  const countPage = Math.floor(countItem / limit) + 1;
  const activePageNum = Number(activePage);
  const [limitNew, setLimitNew] = useState(limit);


  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimitNew(newLimit);
    // // Перенаправление на новую страницу с обновленным лимитом
    window.location.href = `/page/${newLimit}/1`;
  };


  return (
    <div className='Pagination'>

      <select id="limit-select" value={limitNew} onChange={handleLimitChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>


        {activePageNum > 2 &&  <Link to={`/page/${limit}/${1}`}> 1</Link>}
        {activePageNum > 3 && <p>...</p>}
        {activePageNum === countPage && <Link to={`/page/${limit}/${activePageNum-2}`}> {activePageNum-2}</Link>}
        {activePageNum !== 1 && <Link to={`/page/${limit}/${activePageNum-1}`}> {activePageNum-1}</Link>}
        <Link to={`/page/${limit}/${activePageNum}`} className='active' style={{ color: '#fff' }}> {activePageNum}</Link>
        {activePageNum !== countPage &&  <Link to={`/page/${limit}/${activePageNum+1}`}> {activePageNum+1}</Link>}
        {activePageNum === 1 && <Link to={`/page/${limit}/${activePageNum+2}`}> {activePageNum+2}</Link>} 
        {activePageNum < countPage - 2 &&  <p>...</p>}
        {activePageNum < countPage - 1 && <Link to={`/page/${limit}/${countPage}`}> {countPage}</Link>}  
    </div>
  );
}


Pagination.propTypes = {
  limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default memo(Pagination);