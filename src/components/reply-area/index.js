import {memo, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import "./style.css";

function ReplyArea({onAdd, onClose, session = false, path}) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      onAdd(value);
    }),
  };

	const cn = bem('ReplyArea');

	return (
		<>
			{session ? (
				<div className={cn()}>
					<div className={cn('top')}>Новый ответ</div>
					<form onSubmit={callbacks.onSubmit}>
						<textarea className={cn('textarea')} onChange={onChange}/>
						<button type="submit">Отправить</button>
						<button type="button" onClick={onClose}>Отмена</button>
					</form>
				</div>
			) : (
				<div className={cn('auth')}>
					<Link to={path}>Войдите</Link>, чтобы иметь возможность ответить.{' '}
					<span onClick={onClose}>Отмена</span>
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
};

export default memo(ReplyArea);