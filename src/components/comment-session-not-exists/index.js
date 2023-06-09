import {memo, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentSessionNotExists({onSignIn, onCancel, isShowCancelBtn, scrollIntoView}) {

  const cn = bem('CommentSessionNotExists');

  const wrapRef = useRef(null);

  useEffect(() => {

    if (wrapRef.current && scrollIntoView) {
      wrapRef.current.scrollIntoView({behavior: 'smooth', block: "center", inline: "nearest"});
    }
  }, [scrollIntoView]);


  return (
    <div ref={wrapRef} className={cn()}>
      <button onClick={onSignIn} className={`${cn('btn')} ${cn('singInBtn')}` }>Войдите</button>
      <span>чтобы иметь возможность ответить.</span>
      {isShowCancelBtn && <button onClick={onCancel} className={`${cn('btn')} ${cn('cancelBtn')}` }>Отмена</button>}
    </div>
  );
}

CommentSessionNotExists.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isShowCancelBtn: PropTypes.bool.isRequired,
  scrollIntoView: PropTypes.bool.isRequired
};


export default memo(CommentSessionNotExists);
