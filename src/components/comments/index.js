import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comments(props) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('comments.title')}: ({props.comments.length})</div>
      <div className={cn('container')}>
        {props.comments.map((item) => (
          <Fragment key={item._id}>
          <div className={cn('item')} style={item.level ? { paddingLeft: item.level < 10 ? item.level * 30 : 300 } : {}}>
            <div className={cn('user', item.author._id === props.currentUser._id && 'current-user')}>
              <strong>{item.author.profile.name}</strong><span className={cn('date')}>{item.data}</span>
            </div> 
            <div className={cn('text')}>{item.text}</div>
            <button className={cn('reply')} value={item._id} onClick={() => props.onReply(item)}>{props.t('comments.reply')}</button>
          </div>
          {props.commentId === item._id && props.replyForm()}
          </Fragment>
        ))
        }
      </div>
      {!props.commentId && props.replyForm()}
    </div>
  );
}

Comments.propTypes = {
  props: PropTypes.object,
};

Comments.defaultProps = {
  props: {}
};

export default memo(Comments);
