import {memo} from "react";
import {dateFormat} from "../../utils/date-format";
import PropTypes from 'prop-types';
import CommentHint from "../comment-hint";
import CommentForm from "../comment-form";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentCard(props) {
  const {item, exists, activeForm, setActiveForm, commentValue, setCommentValue, answerComment, t, margin} = props;

  // Функция открытия выбранной формы по id
  const handleOpenForm = (_id) => {
    setActiveForm(_id);
  }

  // Функция закрытия формы в карточке
  const handleCloseForm = () => {
    setActiveForm('');
  }

  // Функция ответа на выбранный комментарий по id
  const handleAnswerComment = (_id) => {
    answerComment(_id)
    setActiveForm('');
  }

  const cn = bem('CommentCard');

  return (
    <div className={cn({margin})}>
      <div className={cn('head')}>
        <div className={cn('author')}>{item.author.profile.name}</div>
        <div className={cn('date')}>{dateFormat(item.dateCreate)}</div>
      </div>
      <div className={cn('text')}>{item.text}</div>
      <button onClick={() => handleOpenForm(item._id)} className={cn('article')}>{t('comments.answer')}</button>
      
      {/* Сверяем записанный id в состоянии с id выбранной карточки для открытия  */}
      {activeForm === item._id && (
        <> 
          {!exists
            ? <div className={cn('form-wrapper')}>
                <CommentHint link={'/login'} text={'ответить'}/>
                <button className={cn('cancel-btn')} onClick={handleCloseForm}>{t('comments.cancel')}</button>
              </div>
            : <div className={cn('form-wrapper')}>
                <CommentForm text={'ответ'} value={commentValue} onChange={setCommentValue} onClick={() => handleAnswerComment(item._id)} t={t}>
                  <button onClick={handleCloseForm}>{t('comments.cancel')}</button>
                </CommentForm>
              </div>
          }
        </>
      )}

      {/* Вывод дочерних комментариев из поля replies */}
      {item.replies?.map(reply => (
        <CommentCard  
          key={reply._id} item={reply} exists={exists} 
          activeForm={activeForm} setActiveForm={setActiveForm} 
          commentValue={commentValue} setCommentValue={setCommentValue}
          answerComment={answerComment} t={t} margin={'left'} 
        />
      ))}
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
  exists: PropTypes.bool,
  activeForm: PropTypes.string,
  setActiveForm: PropTypes.func,
  commentValue: PropTypes.string,
  setCommentValue: PropTypes.func,
  answerComment: PropTypes.func,
  t: PropTypes.func,
  margin: PropTypes.oneOf(['left'])
}

CommentCard.defaultProps = {
  setActiveForm: () => {},
  setCommentValue: () => {},
  answerComment: () => {},
  t: (text) => text,
}

export default memo(CommentCard);