import { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import './style.css';
import CommentContainer from '../comment-container';
import CommentForm from '../comment-form';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';

function LinkToLogin() {
  return (
    <span className="loginToAllowComment">
      <Link to={`/login`}>Войдите</Link>, чтобы иметь возможность комментировать
    </span>
  );
}

function CommentsWrapper(props) {
  const isLogin = useSelector(state => state.session.exists);
  const [commentIdFormVisible, setCommentIdFormVisible] = useState('');
  const { comments, _id, _type, t } = props;
  const formattedComments = useMemo(
    () => listToTree(comments.items, '_id', 'article'),
    [props.comments],
  );
  const userId = useSelector(state => state.session.user._id);

  useEffect(() => {
    if (!isLogin) {
      setCommentIdFormVisible('');
    }
  }, [isLogin]);

  const cn = bem('CommentsWrapper');
  return (
    <div className={cn()} key={comments.items.length}>
      <span className={cn('header')}>{`${t(`product.comments`)}: (${comments.count})`}</span>
      <div className={cn('container')}>
        {formattedComments[0]?.children.map(comment => {
          return (
            <CommentContainer
              key={comment._id}
              isLogin={isLogin}
              LinkToLogin={LinkToLogin}
              setCommentIdFormVisible={setCommentIdFormVisible}
              commentIdFormVisible={commentIdFormVisible}
              comment={comment}
              userId={userId}
            />
          );
        })}
      </div>

      {isLogin ? (
        commentIdFormVisible === '' && (
          <CommentForm _id={_id} _type={_type} setCommentIdFormVisible={setCommentIdFormVisible} />
        )
      ) : (
        <LinkToLogin></LinkToLogin>
      )}
    </div>
  );
}

CommentsWrapper.propTypes = {
  comments: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  _id: PropTypes.string,
  _type: PropTypes.string,
};

export default memo(CommentsWrapper);
