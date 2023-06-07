import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import HeadLogin from '../../components/head-login';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import UserDetails from '../../components/user-details';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function ProfileUserPage(props) {
	const store = useStore();
	let navigate = useNavigate();
  const { t } = useTranslate();

	const select = useSelector((state) => ({
		user: state.profile.user,
	}));

	const callbacks = {
		singOut: useCallback(() => store.actions.profile.singOut(), [store]),
	};

  useEffect(() => {
    if(!select.user) navigate('/login');
  }, [select.user])

	return (
		<PageLayout>
			<HeadLogin user={select.user} singOut={callbacks.singOut} />
			<Head title={t('title')} />
			<Navigation />
			<UserDetails user={select.user} />
		</PageLayout>
	);
}

ProfileUserPage.propTypes = {};

export default ProfileUserPage;
