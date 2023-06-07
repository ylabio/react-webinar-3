import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function LoginBtn(props) {
	return (
		<div className="Log-in">
			<Link to={'/login'} onClick={props?.singOut}>
				{props.title}
			</Link>
		</div>
	);
}

export default memo(LoginBtn);
