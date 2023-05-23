import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function List({list, functionResolver, buttonTitle}){

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} functionResolver={functionResolver} buttonTitle={buttonTitle} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  functionResolver: PropTypes.func,
  buttonTitle: PropTypes.string
};

List.defaultProps = {
  functionResolver: () => {}
}

export default React.memo(List);
