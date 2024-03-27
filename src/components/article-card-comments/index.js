import {memo,useState,useCallback,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';
import debounce from 'lodash.debounce';

function ArticleCardComments({articleComments, autorization, count, onAnswer, onComment, user, onLogin, t}) {
  const cn = bem('ArticleCardComments');

  const [id,setId] = useState(0);
  const [IndexAnswer,setIndexAnswer] = useState(0);
  const [IndentAnswer,setIndentAnswer] = useState(0);
  const [Answer,setAnswer] = useState('');
  const [Comment,setComment] = useState('');
  const [boolScroll,setBoolScroll] = useState(false);

  const onChangeAnswerDebounce = useCallback(
    debounce(value => setAnswer(value), 300),
    []
  );

  const onChangeAnswer = (event) => {
    //setAnswer(event.target.value);
    onChangeAnswerDebounce(event.target.value);
  };

  const onChangeCommentDebounce = useCallback(
    debounce(value => setComment(value), 300),
    []
  );

  const onChangeComment = (event) => {
    //setComment(event.target.value);
    onChangeCommentDebounce(event.target.value);
  };

  useEffect(() => {
    if (boolScroll == true && vRefScrollY && vRefScrollY.current != null) {
      window.scrollTo(0, vRefScrollY.current.offsetTop-200);
      //vRefScrollY.current.scrollIntoView();
      setBoolScroll(false);
    }
  }, [boolScroll,vRefScrollY])

  const vRefScrollY = useRef(null);

  const fNumnerForNewAnswer = (_id,level,index) => {
    setId(_id);
    for (let vvi = index + 1; vvi <= articleComments.length - 1; vvi++) {
      if (articleComments[vvi].level <= level || vvi == articleComments.length - 1) {
        //if (!(!articleComments[vvi-1].text || articleComments[vvi-1].isDeleted == true)) {
          setIndexAnswer(vvi - 1);
          break;
        //}
      }
    }
    if (articleComments.length - 1 == index) {
      setIndexAnswer(index);
    }
    setIndentAnswer(fIndentAnswer(level));
    setBoolScroll(true);
  };

  const fIndentAnswer = (level) => {
    const vIndentAnswer = 30 * level;
    const vMaxIndentAnswer = 10 * 30;
    const vBoolMaxIndentAnswer = (vIndentAnswer < vMaxIndentAnswer ? false : true);
    const vIndentAnswerNew = (vBoolMaxIndentAnswer ? vMaxIndentAnswer : vIndentAnswer);
    return vIndentAnswerNew;
  };

  const vMaxIndex = 20;

  const fCommentElement = (item,index) => {
    if (!item.text) return (fAnswer(item,index));
    const date = new Date(item.dateCreate);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: "long" });
    const day = date.toLocaleString(t('articleComments.lang'), { day: "2-digit" });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const vMonth = (month && item.isDeleted == false ? t(`articleComments.${month.toLowerCase()}`) : '');
    const formattedDate = `${day} ${vMonth} ${year} ${t('articleComments.in')} ${hours}:${(minutes < 10 ? '0' : '')}${minutes}`;
    const vIndentAnswerNew = fIndentAnswer(item.level);
    const vWidthDivForText = 1024 - 60 - vIndentAnswerNew;
    const vMaxLengthCharLine = 80;
    let vCountChar;
    let vIndex1;
    let vvi;
    let vTextOriginal = item.text;
    vIndex1 = 0;
    vCountChar = 0;
    let vText = '';
    let vFlag1 = false;
    let vStr;
    for (vvi = 0; vvi < vTextOriginal.length; vvi++) {
      if (vFlag1 == false && vTextOriginal.substring(vvi,1) != ' ') {
        vFlag1 = true;
      }
      if (vCountChar >= vMaxLengthCharLine - 1) {
        vStr = vTextOriginal.substring(vIndex1, vvi + 1);
        if (getTextWidth(vStr) >= vWidthDivForText) {
          vText += vStr + '\n';
          vIndex1 = vvi + 1;
          vCountChar = 0;
        }
      }
      else {
        vCountChar++;
      }
    }
    if (vvi > 0 && vFlag1 == true) {
      vText += vTextOriginal.substring(vIndex1, vvi);
    }
    else {
      return;
    }

    function getTextWidth(text, font) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
    
      context.font = font || getComputedStyle(document.body).font;
    
      return context.measureText(text).width;
    }

    return (
      <div key={index * vMaxIndex + 19}>
      <div key={index * vMaxIndex + 0} style={{marginLeft: vIndentAnswerNew}}>
        <div key={index * vMaxIndex + 1} className={cn('line')}>
          <div key={index * vMaxIndex + 2}
               className={cn((autorization == true && user == item.author ? 'authorAutorization' : 'author'))}>{item.author}</div>
          <div key={index * vMaxIndex + 3} className={cn('dateCreate')}>{(item.isDeleted == false ? formattedDate : '')}</div>
        </div>
        <div key={index * vMaxIndex + 4} className={cn('text')}>
          {vText}
        </div>
        <div key={index * vMaxIndex + 5} className={cn('toAnswer')}>
          <Link key={index * vMaxIndex + 6}
                onClick={() => fNumnerForNewAnswer(item._id,item.level,index)}>{t('articleComments.toAnswer')}</Link>
        </div>
        {(autorization == false && id == item._id ?
          <div key={index * vMaxIndex + 7} className={cn('message')}>
            <Link key={index * vMaxIndex + 8} to='/login' onClick={onLogin}>{t('articleComments.logIn')}</Link>{', '}
            {t('articleComments.textForToAnswer')}{'. '}
            <Link key={index * vMaxIndex + 9} className={cn('cancel')} onClick={() => setId(0)}>{t('articleComments.cancel')}</Link>
          </div>
        :
        ''
        )}
      </div>
      {fAnswer(item,index)}
      </div>
    )
  }

  const fAnswer = (item,index) => {
    return (
    (autorization == true && index == IndexAnswer && id != 0 ? 
      <div key={index * vMaxIndex + 10} style={{marginLeft: IndentAnswer}}>
        <div key={index * vMaxIndex + 11} className={cn('Answer')}>
          <div key={index * vMaxIndex + 12} className={cn('newAnswer')}>{t('articleComments.newAnswer')}</div>
          <textarea ref={vRefScrollY} key={index * vMaxIndex + 13}
                    className={cn('textareaAnswer')}
                    onChange={onChangeAnswer}/>
          <div key={index * vMaxIndex + 14} className={cn('lineButton')}>
            <div key={index * vMaxIndex + 15} className={cn('divSend')}>
              <button key={index * vMaxIndex + 16}
                      className={cn('buttonSend')}
                      onClick={() => onAnswer(Answer,id)}>{t('articleComments.send')}</button>
            </div>
            <div key={index * vMaxIndex + 17} className={cn('divCancel')}>
              <button key={index * vMaxIndex + 18}
                      className={cn('buttonCancel')}
                      onClick={() => setId(0)}>{t('articleComments.cancel')}</button>
            </div>
          </div>
        </div>
      </div>
        :
        ''
        )
    )
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('articleComments.title')} ({count+1})</div>
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
          <Link to='/login' onClick={onLogin}>{t('articleComments.logIn')}</Link>, {t('articleComments.textForLogIn')}
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
  onLogin: PropTypes.func,
  user: PropTypes.string,
  t: PropTypes.func
};

ArticleCardComments.defaultProps = {
  user: '',
  autorization: false,
  onAnswer: () => {},
  onComment: () => {},
  onLogin: () => {},
  t: (text) => text
}

export default memo(ArticleCardComments);
