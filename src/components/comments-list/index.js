import React from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Comment from '../comment/index'
import PropTypes from "prop-types";

const CommentsList = ({ list, nest, user, count, replierActive, setReplierComment }) => {
  const style = nest > 0 ? {
    padding: 0,
    marginLeft: '20px'
  } : {}

  const cn = bem('CommentsList')
  return (
    <div style={style} className={cn()}>
      {nest === 0 && <span className={cn('total')}>Комментарии ({count})</span>}
      <div className={cn('list')}>
        {list?.map(comment => (
          <React.Fragment key={comment._id}>
            <Comment data={comment} isOwner={user === comment.author._id}
                     replierActive={replierActive} setReplierComment={setReplierComment}/>
            {comment.children.length > 0 &&
              <CommentsList list={comment.children} nest={nest + 1} user={user}
                            replierActive={replierActive} setReplierComment={setReplierComment}/>
            }
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

CommentsList.propTypes = {
  list: PropTypes.array,
  nest: PropTypes.number,
  count: PropTypes.number,
  replierActive: PropTypes.string,
  setReplierComment: PropTypes.func
}

CommentsList.defaultProps = {
  setReplierComment: () => {}
}

export default React.memo(CommentsList);
