import {memo} from "react";
import './style.css';

function ItemSection({item, renderItem}) {

  return (
    <div className='item-info-wrapper'>
      {renderItem(item)}
    </div>
  )
}

export default memo(ItemSection);