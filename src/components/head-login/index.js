import React from 'react';
import PropTypes from 'prop-types';
import LoginBtn from '../login-btn';
import './style.css';
import LogoutBtn from '../logout-btn';
import { Link } from 'react-router-dom';

function HeadLogin(props) {

	return (
		<div className="Head-login">
			<Link to={'/profile'} className="Head-login__user">
				{props.user ? props.user.profile.name : ''}
			</Link>
			{props.user ? (
				<LogoutBtn title={'Выход'} singOut={props.singOut} />
			) : (
				<LoginBtn title={'Вход'} />
			)}
		</div>
	);
}

HeadLogin.propTypes = {};

export default HeadLogin;
