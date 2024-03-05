import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem, onActionType }) {
  const sortedList = useMemo(() => {
    const copiedList = [...list];
    return copiedList.sort((a, b) => a.code - b.code);
  }, [list]);

  return (
    <div className='List'>{
      sortedList.map(item =>
        <div key={item.code} className='List-item'>
            {renderItem({ item, onActionType })}
        </div>
      )}
    </div>
  );
}

List.propTypes = {   
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onActionType: PropTypes.func,  
  renderItem: PropTypes.func 
};

export default React.memo(List);
