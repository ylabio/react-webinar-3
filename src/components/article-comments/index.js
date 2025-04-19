import { cn as bem } from '@bem-react/classname';

import PropTypes, {string} from "prop-types";

import { dateFormat } from '../../utils/date-format';

import './style.css';

function ArticleComments({
  children,
  commentsCount = 0,
  lastCommentId = '',
  items = [],
  onChangeCommentData = (x, y, i) => {},
  t = text => text,
  lang = 'ru'
}) {
  const cn = bem('Comments');

  return (
    <div>
      <h4 className={cn('title')}>
        {t('comments')} ({commentsCount})
      </h4>
      {!!commentsCount && (
        <ul className={cn('list')}>
          {items.map((item, idx) => {
            const { text, paddingL, author, dateCreate, _id } = item;

            return (
              <li key={`${text}${idx}`} className={cn('item')} style={{ paddingLeft: paddingL }}>
                <div className={cn('item', { header: true })}>
                  <h4>{author.profile.name}</h4>
                  <div>{dateFormat(dateCreate, lang)}</div>
                </div>
                <div className={cn('item', { text: true })}>{text}</div>
                <a
                  className={cn('link')}
                  onClick={() => onChangeCommentData(_id, 'comment', author.profile.name)}
                >
                  {t("answer.reply")}
                </a>
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
  t:PropTypes.func,
  lang: PropTypes.string,
  onChangeCommentData: PropTypes.func,
};

export default ArticleComments;
