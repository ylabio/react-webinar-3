import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List(props) {
  
  const cn = bem('List');

  return (
    <div className={cn()}>{
      props.list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item buttonTitle={props.buttonTitle} item={item} onClick={props.onClick}/>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func,
}

List.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(List);
