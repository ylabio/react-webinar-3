import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import HeadLogin from '../../components/head-login';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const store = useStore();
	let navigate = useNavigate();
	const { t } = useTranslate();

	const select = useSelector((state) => ({
		user: state.profile.user,
		error: state.profile.error,
	}));
 

	useEffect(() => {
		if (select.user) navigate('/profile');
	}, [select.user]);

	const callbacks = {
		signIn: useCallback((data) => store.actions.profile.signIn(data), [store]),
		singOut: useCallback((data) => store.actions.profile.singOut(data), [store]),
	};

	function clearStateError() {
		select.error = '';
	}

	return (
		<PageLayout>
			<HeadLogin user={select.user} singOut={callbacks.singOut} />
			<Head title={t('title')} />
			<Navigation clearStateError={clearStateError} />
			<LoginForm title={'Вход'} signIn={callbacks.signIn} error={select.error} />
		</PageLayout>
	);
}

LoginPage.propTypes = {};

export default LoginPage;
