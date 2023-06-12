import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import './style.css';
import CommentForm from '../comment-form';

function Comment(props) {
	const [showCommentForm, setShowCommentForm] = useState(false);
	const paddingLVL = { paddingLeft: `calc(${props.data.level} * 30px )` };
	const handleClick = () => {
		if (showCommentForm === false) {
			setShowCommentForm(true);
		} else {
			setShowCommentForm(false);
		}
	};
	return (
		<>
			<div className={`Comment`} style={paddingLVL}>
				<div className="Comment-header">
					<span className="Comment-user">{props.userName}</span>
					<p className="Comment-date">{props.date}</p>
				</div>
				<div className="Comment-body">
					<p className="Comment-text">{props.text}</p>
				</div>
				<button className="Comment-reply" onClick={handleClick}>
					Ответить
				</button>
			</div>
			{showCommentForm && <CommentForm show={handleClick} />}
		</>
	);
}

Comment.propTypes = {};

export default Comment;
