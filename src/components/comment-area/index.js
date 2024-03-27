import {memo, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import "./style.css";

function CommentArea({onAddComment, session = false, path, t, location}) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      onAddComment(value);
    }),
  };

	const cn = bem('CommentArea');

	return (
		<>
			{session ? (
				<div className={cn()}>
					<div className={cn('top')}>{t("comments.newComment")}</div>
					<form onSubmit={callbacks.onSubmit}>
						<textarea className={cn('textarea')} onChange={onChange}/>
						<button type="submit">{t("comments.send")}</button>
					</form>
				</div>
			) : (
				<div>
					<Link to={path} state={{back: location}}>{t("comments.replyLogin")}</Link>, {t("comments.commentMessage")}
				</div>
			)}
		</>
	)
}

CommentArea.propTypes = {
  session: PropTypes.bool,
  path: PropTypes.string,
  onAddComment: PropTypes.func,
	t: PropTypes.func,
	location: PropTypes.string,
};

export default memo(CommentArea);