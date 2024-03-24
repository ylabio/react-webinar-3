import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../utils/formatted-date'
import './style.css';
import {Link} from 'react-router-dom';

function CommentItem(props) {

  const cn = bem('CommentItem');

  const openTextArea = () => {

  }
  return (
    <div className={cn()} style={{marginLeft: `${(props.item.parent._tree.length - 1) * 30}px`}}>
      <div className={cn('block')}>
        <div className={cn('title')}>
          <b>{props.item.author?.profile?.name}</b>
          <span>{formatDate(props.item?.dateCreate)}</span>
        </div>
        <div className={cn('content')}>
          <p>{props.item?.text}</p>
        </div>
        <button className={cn('link')} onClick={openTextArea}>Ответить</button>
      </div>
        {props.item.replies?.map(reply => (
          <CommentItem key={reply._id} item={reply} />
        ))}
    </div>
  );
}

CommentItem.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      }),
    }),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    isDeleted: PropTypes.bool,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string,
      _tree: PropTypes.array
    }),
    text: PropTypes.string,
  }).isRequired,
};

CommentItem.defaultProps = {
}

export default memo(CommentItem);
