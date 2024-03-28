import {memo, useRef} from "react";
import {dateFormat} from "../../utils/date-format";
import PropTypes from 'prop-types';
import CommentNav from "../comment-nav";
import CommentForm from "../comment-form";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentCard(props) {
  const {item, nestedLevel, exists, activeForm, setActiveForm, commentValue, setCommentValue, replyComment, user, t, marginLeft} = props;

  const formRef = useRef();
  const username = exists ? user.profile.name : '';
  const margin = nestedLevel <= 10 ? 30 : 0;

  // Функция открытия выбранной формы по id
  const handleOpenForm = (_id) => {
    setActiveForm(_id);
    formRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  // Функция закрытия формы в карточке
  const handleCloseForm = () => {
    setActiveForm('');
  }

  // Функция ответа на выбранный комментарий по id
  const handleReplyComment = (_id) => {
    if (commentValue.trim()) {
      replyComment(_id);
      setActiveForm('');
    }
  }

  const cn = bem('CommentCard');

  return (
    <div className={cn({marginLeft})}>

      <div className={cn('card')}>
        <div className={cn('head')}>
          <div className={cn(username === item.author.profile.name ? 'current-author' : 'author')}>
            {item.author.profile.name}
          </div>
          <div className={cn('date')}>{dateFormat(item.dateCreate)}</div>
        </div>
        <div className={cn('text')}>{item.text}</div>
        <button onClick={() => handleOpenForm(item._id)} className={cn('article')}>{t('comments.reply')}</button>
      </div>

      {/* Вывод дочерних комментариев из поля replies */}
      {item.replies?.map((reply) => {
        return (
          <CommentCard  
            key={reply._id} nestedLevel={nestedLevel + 1} item={reply} exists={exists} 
            activeForm={activeForm} setActiveForm={setActiveForm} 
            commentValue={commentValue} setCommentValue={setCommentValue}
            replyComment={replyComment} user={user} t={t} marginLeft={`${margin}`}
          />
        )
      })}

      {/* Сверяем записанный id в состоянии с id выбранной карточки для открытия  */}
      <div ref={formRef}>
        {activeForm === item._id && (
          <> 
            {!exists
              ? <div className={cn('form-wrapper')}>
                  <CommentNav link={'/login'} description={'ответить'} t={t}/>
                  <button className={cn('cancel-btn')} onClick={handleCloseForm}>{t('comments.cancel')}</button>
                </div>
              : <div className={cn('form-wrapper')}>
                  <CommentForm text={'ответ'} value={commentValue} onChange={setCommentValue} onClick={() => handleReplyComment(item._id)} t={t}>
                    <button onClick={handleCloseForm}>{t('comments.cancel')}</button>
                  </CommentForm>
                </div>
            }
          </>
        )}
      </div>

    </div>
  )
}

CommentCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    dateCreate: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  nestedLevel: PropTypes.number,
  exists: PropTypes.bool,
  activeForm: PropTypes.string,
  setActiveForm: PropTypes.func,
  commentValue: PropTypes.string,
  setCommentValue: PropTypes.func,
  replyComment: PropTypes.func,
  t: PropTypes.func,
  marginLeft: PropTypes.oneOf(['0', '30'])
}

CommentCard.defaultProps = {
  setActiveForm: () => {},
  setCommentValue: () => {},
  replyComment: () => {},
  t: (text) => text,
}

export default memo(CommentCard);