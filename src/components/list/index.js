import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({list, requiredCallback, btnName}) {
	const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} requiredCallback={requiredCallback} btnName={btnName}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  requiredCallback: PropTypes.func,
  btnName: PropTypes.string.isRequired,
};

List.defaultProps = {
	requiredCallback: () => {
  },
}

export default React.memo(List);
