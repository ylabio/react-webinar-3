import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';
import { Comment } from '../comment';

export const SmartComment = ({
  comment,
  userId,
  openFormForId,
  handleToggleForm,
  onSubmit,
  value,
  onChange,
}) => {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.getAuthor(comment.author._id));
  }, []);

  const select = useReduxSelector(
    state => ({
      author: state.comments.authors[comment.author._id]?.profile.name,
    }),
    shallowEqual,
  );

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(comment.dateCreate));

  return (
    <div className="Smart-Comments">
      {comment && (
        <Comment
          by={select.author}
          text={comment.text}
          isMine={userId === comment.author._id}
          date={formattedDate}
          isFormOpen={openFormForId === comment._id}
          toggleForm={() => handleToggleForm(comment._id)}
          onSubmit={onSubmit}
          value={value}
          onChange={onChange}
        />
      )}
      <div className="Smart-Comment">
        {comment &&
          comment.children?.map(comment => (
            <SmartComment
              key={comment._id}
              comment={comment}
              userId={userId}
              openFormForId={openFormForId}
              handleToggleForm={handleToggleForm}
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
            />
          ))}
      </div>
    </div>
  );
};
