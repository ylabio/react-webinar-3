import { cn as bem } from '@bem-react/classname';

import PropTypes from 'prop-types';

import { dateFormat } from '../../utils/date-format';

import './style.css';

function ArticleComments({
  children,
  commentsCount = 0,
  lastCommentId = '',
  onOpenForm = (x, y, i) => {},
  items = [],
}) {
  const cn = bem('Comments');
  return (
    <div>
      <h4 className={cn('title')}>Комментарии ({commentsCount})</h4>
      {!!commentsCount && (
        <ul className={cn('list')}>
          {items.map((item, idx) => {
            const { text, paddingL, author, dateCreate, _id } = item;

            return (
              <li key={`${text}${idx}`} className={cn('item')} style={{ paddingLeft: paddingL }}>
                <div className={cn('item', { header: true })}>
                  <h4>{author.profile.name}</h4>
                  <div>{dateFormat(dateCreate, 'ru-RU')}</div>
                </div>
                <div className={cn('item', { text: true })}>{text}</div>
                <button
                  className={cn('button')}
                  onClick={() => onOpenForm(author.profile.name, _id, items)}
                >
                  Ответить
                </button>
                {lastCommentId === _id && children}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

ArticleComments.propTypes = {
  commentsCount: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      children: PropTypes.array.isRequired,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      paddingL: PropTypes.string,
      dateCreate: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  children: PropTypes.node,
  lastCommentId: PropTypes.string,
  articleId: PropTypes.string,
  onOpenForm: PropTypes.func,
};

export default ArticleComments;
