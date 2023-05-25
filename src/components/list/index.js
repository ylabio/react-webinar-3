import {memo} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function List({list, functionResolver, buttonTitle}){

  const cn = bem('List');

<<<<<<< HEAD
=======
function List({list, renderItem}){
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
  return (
    <div className={cn()}>{
      list.map(item =>
<<<<<<< HEAD
        <div key={item.code} className={cn('item')}>
          <Item item={item} functionResolver={functionResolver} buttonTitle={buttonTitle} />
=======
        <div key={item._id} className='List-item'>
          {renderItem(item)}
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
<<<<<<< HEAD
  functionResolver: PropTypes.func,
  buttonTitle: PropTypes.string
};

List.defaultProps = {
  functionResolver: () => {}
=======
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
>>>>>>> 0d7275a5b9abf52bfdf66805aac7ed9247c620c1
}

export default memo(List);
