import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Comments({list, renderItem}) {
  console.log(list)
  return (
    <div className='Comments'>
      <h2 className='Comments-title'>Комментарии ({list.length})</h2>
      {
      list.map(comment =>
        <div key={comment._id} className='Comments-item'>
          {renderItem(comment)}
        </div>
      )}
    </div>
  )
}

Comments.propTypes = {
  // list: PropTypes.arrayOf(PropTypes.shape({
  //   _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  // })).isRequired,
  // renderItem: PropTypes.func,
};

Comments.defaultProps = {
  renderItem: (item) => {
  },
}

export default memo(Comments);
