import React, { memo } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function LoginBtn(props) {

	let navigate = useNavigate();

	function changePageUser() {
		props.singOut();
		navigate('/login');
	}

	return (
		<div className="Log-out">
			<button onClick={changePageUser}>{props.title}</button>
		</div>
	);
}

export default memo(LoginBtn);
