import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onActionType, onActionTitle}) {
  const sortedList = useMemo(() => {
    const copiedList = [...list];  
    return copiedList.sort((a, b) => a.code - b.code);
  }, [list]);

  return (
    <div className='List'>{
      sortedList.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onActionType={onActionType} onActionTitle={onActionTitle} />
        </div>
      )}
    </div>
  );
} 

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onActionType: PropTypes.func.isRequired,
  onActionTitle: PropTypes.string.isRequired
};

export default React.memo(List);
