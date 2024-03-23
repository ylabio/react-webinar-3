import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comments(props) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('comments.title')}: ({props.comments.length})</div>
      <div className={cn('container')}>
        {props.comments.map((item) => (
          <div key={item._id} className={cn('item')} style={item.level ? { paddingLeft: item.level < 10 ? item.level * 30 : 300 } : {}}>
            <div className={cn('user')}><strong>{props.usernames[item.name._id]}</strong><span className={cn('date')}>{item.data}</span></div>
            <div className={cn('text')}>{item.text}</div>
            <button className={cn('reply')} value={item._id} onClick={props.onReply}>{props.t('comments.reply')}</button>
            {props.commentId === item._id && props.replyForm}
          </div>
        ))
        }
      </div>
      {props.commentId === null && props.replyForm}
    </div>
  );
}

Comments.propTypes = {
  props: PropTypes.object,
};

Comments.defaultProps = {
  props: {}
}

export default memo(Comments);
