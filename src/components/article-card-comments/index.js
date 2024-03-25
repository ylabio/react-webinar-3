import {memo,useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';
import debounce from 'lodash.debounce';

function ArticleCardComments({articleComments, autorization, count, onAnswer, onComment, t}) {
  const cn = bem('ArticleCardComments');

  const [id,setId] = useState(0);
  const [Answer,setAnswer] = useState('');
  const [Comment,setComment] = useState('');

  const onChangeAnswerDebounce = useCallback(
    debounce(value => setAnswer(value), 600),
    []
  );

  const onChangeAnswer = (event) => {
    onChangeAnswerDebounce(event.target.value);
  };

  const onChangeCommentDebounce = useCallback(
    debounce(value => setComment(value), 600),
    []
  );

  const onChangeComment = (event) => {
    onChangeCommentDebounce(event.target.value);
  };

  const fCommentElement = (item,index) => {
    const date = new Date(item.dateCreate);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: "long" });
    const day = date.toLocaleString(t('articleComments.lang'), { day: "2-digit" });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const vMonth = (month && item.isDeleted == false ? t(`articleComments.${month.toLowerCase()}`) : '');
    const formattedDate = `${day} ${vMonth} ${year} ${t('articleComments.in')} ${hours}:${(minutes < 10 ? '0' : '')}${minutes}`;
    const vMaxIndex = 18;
    return (
      <div key={index * vMaxIndex + 15} style={{marginLeft: 30 * item.level}}>
        <div key={index * vMaxIndex + 0} className={cn('line')}>
          <div key={index * vMaxIndex + 1} className={cn((item.isDeleted == false ? 'author' : 'authorIsDeleted'))}>{item.author}</div>
          <div key={index * vMaxIndex + 2} className={cn('dateCreate')}>{(item.isDeleted == false ? formattedDate : '')}</div>
        </div>
        <div key={index * vMaxIndex + 3} className={cn('text')}>
          {item.text}
        </div>
        <div key={index * vMaxIndex + 4} className={cn('toAnswer')}>
          <Link key={index * vMaxIndex + 16} onClick={() => setId(item._id)}>{t('articleComments.toAnswer')}</Link>
        </div>
        {(id != item._id ?
        ''
        :
        (autorization == true ?
        <div key={index * vMaxIndex + 5} className={cn('Answer')}>
          <div key={index * vMaxIndex + 6} className={cn('newAnswer')}>{t('articleComments.newAnswer')}</div>
          <textarea key={index * vMaxIndex + 7}
                    className={cn('textareaAnswer')}
                    onChange={onChangeAnswer}/>
          <div key={index * vMaxIndex + 8} className={cn('lineButton')}>
            <div key={index * vMaxIndex + 9} className={cn('divSend')}>
              <button key={index * vMaxIndex + 10}
                      className={cn('buttonSend')}
                      onClick={() => onAnswer(Answer,item._id)}>{t('articleComments.send')}</button>
            </div>
            <div key={index * vMaxIndex + 11} className={cn('divCancel')}>
              <button key={index * vMaxIndex + 12}
                      className={cn('buttonCancel')}
                      onClick={() => setId(0)}>{t('articleComments.cancel')}</button>
            </div>
          </div>
        </div>
        :
        ''
        )
        )}
        {(autorization == false && id == item._id ?
          <div key={index * vMaxIndex + 13} className={cn('message')}>
            <Link key={index * vMaxIndex + 17} to='/login'>{t('articleComments.logIn')}</Link>{', '}
            {t('articleComments.textForToAnswer')}{'. '}
            <Link key={index * vMaxIndex + 14} className={cn('cancel')} onClick={() => setId(0)}>{t('articleComments.cancel')}</Link>
          </div>
        :
        ''
        )}
      </div>
    )
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('articleComments.title')} ({count})</div>
      <div className={cn('comments')}>
      {articleComments.length > 0 && articleComments.map((item,index) => 
        (fCommentElement(item,index))
      )
      }
      </div>
      {(autorization && id == 0 ?
        <div className={cn('Comment')}>
          <div className={cn('newComment')}>{t('articleComments.newComment')}</div>
          <textarea className={cn('textareaComment')}
                    onChange={onChangeComment}/>
          <div className={cn('lineButton')}>
            <div className={cn('divSend')}>
              <button className={cn('buttonSend')}
                      onClick={() => onComment(Comment)}>{t('articleComments.send')}</button>
            </div>
          </div>
        </div>
        :
        (id == 0 ?
        <div className={cn('message')}>
          <Link to='/login'>{t('articleComments.logIn')}</Link>, {t('articleComments.textForLogIn')}
        </div>
        :
        ''
        )
      )}
      </div>
  );
}

ArticleCardComments.propTypes = {
  articleComments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number,
  })).isRequired,
  autorization: PropTypes.bool,
  count: PropTypes.number,
  onAnswer: PropTypes.func,
  onComment: PropTypes.func,
  t: PropTypes.func
};

ArticleCardComments.defaultProps = {
  autorization: false,
  onAnswer: () => {},
  onComment: () => {},
  t: (text) => text
}

export default memo(ArticleCardComments);
