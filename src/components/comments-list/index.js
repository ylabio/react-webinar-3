import React, {useEffect, useState} from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Comment from '../comment/index'
import PropTypes from "prop-types";
import CommentReplier from "../../containers/comment-replier";

const CommentsList = ({ list, nest, user, count, replierActive, setReplierComment, tt }) => {
  const style = nest === 0
    ? {}
    : nest > 10 ? {padding: 0, margin: 0} : {padding: 0, marginLeft: '20px'}

  const [replierOn, setReplierOn] = useState(false)

  useEffect(() => {
    if (replierOn) {
      window.scrollTo({
        top: document.querySelector('#replyTo')?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [replierOn, replierActive])

  const cn = bem('CommentsList')
  return (
    <div style={style} className={cn()}>
      {nest === 0 && <span className={cn('total')}>{tt('comments.title')} ({count})</span>}
      <div className={cn('list')}>
        {list?.map(comment => (
          <React.Fragment key={comment._id}>
            <Comment tt={tt} data={comment} isOwner={user === comment.author._id}
                     setReplierComment={setReplierComment}
                     setReplierOn={setReplierOn}
            />
            {comment.children.length > 0 &&
              <CommentsList list={comment.children} nest={nest + 1} user={user}
                            replierActive={replierActive} setReplierComment={setReplierComment}/>
            }
            {replierActive === comment._id && <CommentReplier parent={'comment'} />}
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
  setReplierComment: PropTypes.func,
  tt: PropTypes.func
}

CommentsList.defaultProps = {
  setReplierComment: () => {},
  tt: () => {}
}

export default React.memo(CommentsList);
