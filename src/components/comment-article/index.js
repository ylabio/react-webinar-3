import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
function CommentArticle(props) {
  const cn = bem('CommentArticle');
  const userId = useSelector((state) => state.session.user?._id);
  const { t, lang } = useTranslate();
  const userAuth = userId === props.comment.author._id;
  const options = {
    date: {
      dateStyle: 'long',
      timeStyle: 'short',
    },
  };

  const date = new Date(props.comment.dateCreate);

  const formattedDate = date
    .toLocaleString(lang, options.date)
    .replace(' г.', '');

  const isCommentEmpty = props.comment.text.trim() === '';
  return (
    <article key={props.comment._id} className={cn()} id={props.comment._id}>
      {props.comment.isDeleted ? (
        <p className={cn('deleted')}>{t('comment.deleted')}</p>
      ) : (
        <>
          <header className={cn('head')}>
            <div className={cn('name', { auth: userAuth })}>
              {props.comment.author.profile.name}
            </div>
            <time className={cn('datetime')}>{formattedDate}</time>
          </header>
          <main>
            <div className={cn('text', { empty: isCommentEmpty })}>
              {isCommentEmpty ? t('comment.empty') : props.comment.text}
            </div>
          </main>
          <footer className={cn('footer')}>
            <button
              className={cn('answer')}
              onClick={() => props.onAnswer(props.comment._id)}
            >
              {t('comment.reply')}
            </button>
          </footer>
        </>
      )}
    </article>
  );
}

CommentArticle.propTypes = {
  onAnswer: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    level: PropTypes.number,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
};
export default CommentArticle;
