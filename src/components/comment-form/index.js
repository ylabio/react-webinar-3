import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';
import './style.css';

function CommentForm(props) {
	const select = useSelector((state) => ({
		userAuth: state.session.exists,
	}));

	const [text, setText] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			{select.userAuth ? (
				<form onSubmit={handleSubmit}>
					<label>
						Новый ответ:
						<textarea value={text} onChange={(e) => setText(e.target.value)} />
					</label>
					<div className='btn-block'>
						<button className='submit' type="submit">Отправить</button>
						<button type="close" onClick={props.show}>
							Отмена
						</button>
					</div>
				</form>
			) : (
				<div>
					<span>
						<Link to={'/login'}>Войдите</Link>, чтобы иметь возможность ответить.
						<button onClick={props.show}>Отмена</button>
					</span>
				</div>
			)}
		</div>
	);
}

CommentForm.propTypes = {};

export default CommentForm;
