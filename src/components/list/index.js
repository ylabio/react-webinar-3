import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from "../item";
import './style.css';

function List({ list, text, onItemClick }) {

  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.length > 0 ? list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} text={text} onItemClick={onItemClick} />
        </div>
      ) : <div className={cn('placeholder')}>В корзине ничего нет</div>}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  text: PropTypes.string,
  onItemClick: PropTypes.func
};

List.defaultProps = {
  text: 'Кнопка',
  onItemClick: () => {
  }
}

export default React.memo(List);
