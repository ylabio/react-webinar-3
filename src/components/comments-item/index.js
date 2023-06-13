import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentsList from '../comments-list';
import dateToString from '../../utils/date-to-string';

function CommentsItem(props) {
  const cn = bem('CommentsItem');

  const callbacks = {
    onReply: (e) => {
      e.preventDefault();
      props.onReply(props.item._id);
    },
  };
  const { day, month, year, time } = dateToString(props.item.dateCreate);
  return (
    <>
      <div className={cn()}>
        <div className={cn('name')}>{props.item.author.profile.name}</div>
        <div className={cn('date')}>
          {`${day} ${props.t(month)} ${year} ${props.t('at')} ${time}`}
        </div>
        <p className={cn('text')}>{props.item.text}</p>
        <a className={cn('link')} onClick={callbacks.onReply}>
          {props.t('reply')}
        </a>
        {!!props.item.children.length && (
          <div className={cn('list')}>
            <CommentsList {...props} list={props.item.children} />
          </div>
        )}
      </div>
    </>
  );
}

CommentsItem.propTypes = {
  props: PropTypes.any,
};

export default memo(CommentsItem);
