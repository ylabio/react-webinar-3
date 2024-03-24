import {memo, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import "./style.css";

function CommentArea({onAddComment, session = false, path}) {
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
					<div className={cn('top')}>Новый комментарий</div>
					<form onSubmit={callbacks.onSubmit}>
						<textarea className={cn('textarea')} onChange={onChange}/>
						<button type="submit">Отправить</button>
					</form>
				</div>
			) : (
				<div>
					<Link to={path}>Войдите</Link>, чтобы иметь возможность комментировать
				</div>
			)}
		</>
	)
}

CommentArea.propTypes = {
  session: PropTypes.bool,
  path: PropTypes.string,
  onAddComment: PropTypes.func,
};

export default memo(CommentArea);