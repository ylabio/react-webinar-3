import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({list, actionBtnName ,onAction, showCount, style}) {
  const cn = bem('List');

  return (
    <div className={cn()} style={style ? style : {}}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item 
            item={item} 
            actionBtnName={actionBtnName} 
            onActionItem={onAction}
            showCount={showCount}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number
  })).isRequired,
  actionBtnName: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  showCount: PropTypes.bool,
  style: PropTypes.object
};

List.defaultProps = {
  onAction: () => {
  },
}

export default React.memo(List);
