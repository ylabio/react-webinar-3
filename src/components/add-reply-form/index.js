import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";
import AuthReplyMessage from "../auth-reply-message";

function AddReplyForm({ onSubmit, onClose, level, isAuth, onMessage, focus }) {
  const cn = bem('ReplyForm');
  const [value, setValue] = useState('');
  const areaRef = useRef();
  const observerRef = useRef(null);

  const callbacks = {
    onChange: (e) => setValue(e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      if (value.trim() !== "") {
        onSubmit(value);
      }
    }
  }

  const observerHandler = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio < 1) {
        areaRef.current.scrollIntoView({ block: "start" });
        observerRef.current.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    if (focus && areaRef.current) {
      const observer = new IntersectionObserver(observerHandler);

      observer.observe(areaRef.current);
      observerRef.current = observer; // Сохраняем ссылку на объект IntersectionObserver

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect(); // Отключаем наблюдение при размонтировании компонента
        }
      };
    }
  }, []);

  if (!isAuth) {
    return (
      <div ref={areaRef} className={cn({ level })}>
        <AuthReplyMessage onClick={onMessage} onClose={onClose} />
      </div>
    );
  }

  return (
    <form onSubmit={callbacks.onSubmit} className={cn({ level })}>
      <span className={cn('label')}>Новый ответ</span>
      <textarea className={cn('textarea')} value={value} onChange={callbacks.onChange} autoFocus={focus} ref={areaRef} />
      <div className={cn('actions')}>
        <button type='submit' className={cn('button')}>Отправить</button>
        <button onClick={onClose} type='button' className={cn('button')}>Отмена</button>
      </div>
    </form>
  );
}

AddReplyForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  level: PropTypes.number,
  isAuth: PropTypes.bool,
  onMessage: PropTypes.func,
  focus: PropTypes.bool
}

AddReplyForm.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  onMessage: () => {}
}

export default memo(AddReplyForm);
