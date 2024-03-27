import {memo, useCallback, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import "./style.css";

function ReplyArea({onAdd, onClose, session = false, path, t, location}) {
  const [value, setValue] = useState('');

	const ref = useRef(null)

	useEffect(() => {
    ref.current.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      onAdd(value);
			onClose()
    }),
  };

	const cn = bem('ReplyArea');

	return (
		<>
			{session ? (
				<div className={cn()} ref={ref}>
					<div className={cn('top')}>{t("comments.newReply")}</div>
					<form onSubmit={callbacks.onSubmit}>
						<textarea className={cn('textarea')} onChange={onChange}/>
						<button type="submit">{t("comments.send")}</button>
						<button type="button" onClick={onClose}>{t("comments.cancel")}</button>
					</form>
				</div>
			) : (
				<div className={cn('auth')} ref={ref}>
					<Link to={path} state={{back: location}}>{t("comments.replyLogin")}</Link>, {t("comments.replyMessage")}.{' '}
					<span onClick={onClose}>{t("comments.cancel")}</span>
				</div>
			)}
		</>
	)
}

ReplyArea.propTypes = {
  session: PropTypes.bool,
  path: PropTypes.string,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
	t: PropTypes.func,
	location: PropTypes.string,
};

export default memo(ReplyArea);