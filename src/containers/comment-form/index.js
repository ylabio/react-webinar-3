import {memo, useCallback, useEffect, useState} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import CommentForbidden from "../../components/comment-forbidden";
import {useLocation, useNavigate} from "react-router-dom";
import {MAX_LEVEL, PADDING_SIZE} from "../comments";

function CommentForm({id, level, onSubmit, onCancel, isAnswer}) {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const cn = bem('CommentForm');

  const [value, setValue] = useState('');
  const [isCommentForbidden, setIsCommentForbidden] = useState(true);

  const isCommentEmpty = !value.trim()

  const paddingLeft = {paddingLeft: `calc(${level < MAX_LEVEL ? level : MAX_LEVEL} * ${PADDING_SIZE}px )`}

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    onSubmit: useCallback(() => {
      const type = isAnswer ? "comment" : "article"

      onSubmit(id, value, type)
    }, [value, isAnswer]),

    onChange: useCallback((event) => {
      setValue(event.currentTarget.value);
    }, []),

    onSignIn: useCallback(() => {
      navigate("/login", {state: {back: location.pathname}});
    }, [location]),
  }

  useEffect(() => {
    if (!select.exists) {
      setIsCommentForbidden(true)
    } else {
      setIsCommentForbidden(false)
    }
  }, [select.exists, select.waiting]);

  return (
    <div style={paddingLeft}>
      {isCommentForbidden
        ? <CommentForbidden t={t}
                            isAnswer={isAnswer}
                            onSignIn={callbacks.onSignIn}
                            onCancel={onCancel}
        />
        : <div className={cn()}>
          <div className={cn('header')}>
            <span className={cn('title')}>{isAnswer ? t("commentaries.newAnswer") : t("commentaries.newComment")}</span>
          </div>
          <textarea className={cn('textarea')}
                    name="comment"
                    id="comment"
                    value={value}
                    onChange={callbacks.onChange}
          />
          <div className={cn('buttons')}>
            <button disabled={isCommentEmpty}
                    className={cn('button')}
                    onClick={callbacks.onSubmit}>
              {t("commentaries.send")}
            </button>

            {isAnswer && <button className={cn('button')} onClick={onCancel}>{t("commentaries.cancel")}</button>}
          </div>
        </div>}
    </div>
  )
}

CommentForm.propTypes = {
  id: PropTypes.string,
  level: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isAnswer: PropTypes.bool
};

CommentForm.defaultProps = {
  onCancel: () => {
  },
  isAnswer: false
};

export default memo(CommentForm);
