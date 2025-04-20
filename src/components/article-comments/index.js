import { createRef, useEffect, useRef, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { dateFormat } from '../../utils/date-format';

import './style.css';

function ArticleComments({
  children,
  commentsCount = 0,
  lastCommentId = '',
  items = [],
  onChangeCommentData = (x, y, i) => {},
  t = text => text,
  lang = 'ru',
  userId = '',
}) {
  const [formPadding, setFormPadding] = useState(0);
  const [scrollPlace, setScrollPlace] = useState('');

  const cn = bem('Comments');
  const commentRefs = useRef({});

  const onClickComment = (id, type, authorNickname, paddigEl) => {
    onChangeCommentData(id, type, authorNickname);
    paddigEl <= 240 ? setFormPadding(paddigEl + 40) : setFormPadding(paddigEl);
    
    if (scrollPlace === lastCommentId) scrollToComment(scrollPlace);
  };

  const scrollToComment = commentId => {
    if (commentId) {
      commentRefs.current[commentId].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
      setScrollPlace(commentId);
    }
  };

  useEffect(() => {
    scrollToComment(lastCommentId);
  }, [lastCommentId]);

  return (
    <div>
      <h4 className={cn('title')}>
        {t('comments')} ({commentsCount})
      </h4>
      {!!commentsCount && (
        <ul className={cn('list')}>
          {items.map((item, idx) => {
            const { text, paddingL, author, dateCreate, _id } = item;
            commentRefs.current[_id] = createRef();
            return (
              <li
                key={`${text}-${idx}-${_id}`}
                className={cn('item')}
                id={_id}
                ref={commentRefs.current[_id]}
              >
                <div style={{ paddingLeft: paddingL }}>
                  <div className={cn('item', { header: true })}>
                    <h4 className={userId === author._id ? cn('author') : ''}>
                      {author.profile.name}
                    </h4>
                    <div>{dateFormat(dateCreate, lang)}</div>
                  </div>
                  <div className={cn('item', { text: true })}>{text}</div>
                  <a
                    className={cn('link')}
                    onClick={() =>
                      onClickComment(_id, 'comment', author.profile.name, paddingL, lastCommentId)
                    }
                  >
                    {t('answer.reply')}
                  </a>
                </div>
                <div style={{ paddingLeft: formPadding }}>{lastCommentId === _id && children}</div>
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
      paddingL: PropTypes.number,
      dateCreate: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  children: PropTypes.node,
  lastCommentId: PropTypes.string,
  t: PropTypes.func,
  lang: PropTypes.string,
  userId: PropTypes.string,
  onChangeCommentData: PropTypes.func,
};

export default ArticleComments;
