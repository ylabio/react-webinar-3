import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

function TreeList(props) {

  const cn = bem('TreeList');
  
  return (
    <div
      className={cn()}
      style={{paddingLeft: props.level > 0 && props.level <= props.maxLevel ? "30px" : "0"}}
    >{
      props.list.map(item => 
        <div key={item._id} className={cn('item', {theme: props.theme})}>
          {props.renderItem(item, props.level, props.maxLevel, props.renderItem)}
        </div>
      )}
    </div>
  )
}

TreeList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  level: PropTypes.number,
  maxLevel: PropTypes.number,
  renderItem: PropTypes.func,
  theme: PropTypes.string
};

TreeList.defaultProps = {
  level: 0,
  maxLevel: 0,
  renderItem: (item, level, renderItem) => {
  },
  theme: ''
}

export default memo(TreeList);
