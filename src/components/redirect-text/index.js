import { memo, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function RedirectText({ isAnswer, closeAnswerForm, t, toLogin }) {
  const cn = bem('RedirectText');

  const tRef = useRef(null);

  useEffect(() => {
    if (isAnswer) {
      tRef.current.scrollIntoView({block: "center", behavior: "smooth"});
    }
  }, [isAnswer]);

  const callbacks = {
    closeAnswerForm: () => closeAnswerForm(),
  }

  return (
    <div className={cn()}>
      {isAnswer
        ? <div ref={tRef} className={cn('text')} onClick={toLogin}>
          <span  className={cn('link')} >{t('comments.redirectText')}</span>
          {t('comments.redirectTextAnswer')}
        </div>
        : <p className={cn('text')} onClick={toLogin}>
          <span  className={cn('link')}>{t('comments.redirectText')}</span>
          {t('comments.redirectTextComment')}
        </p>
      }
      {isAnswer && <p className={cn('text')}>
        <a className={cn('cancel')} onClick={callbacks.closeAnswerForm}>{t('comments.cancel')}</a>
      </p>}
    </div>
  )
}

RedirectText.propTypes = {
  isAnswer: PropTypes.string.isRequired,
  closeAnswerForm: PropTypes.func.isRequired,
  t: PropTypes.func,
  toLogin: PropTypes.func.isRequired,
};

RedirectText.defaultProps = {
  isAnswer: '',
  closeAnswerForm: () => { },
  toLogin: () => { },
}

export default memo(RedirectText);
