import React,  {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Auth from '../../components/auth';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import UserProfile from '../../components/user-profile';
import { useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';

function User() {
    const store = useStore();
    const { t } = useTranslate();
    const navigate = useNavigate();

    const select = useSelector(state => ({
        user: state.user.user,
        isAuth: state.user.isAuth,
        profile: state.profile.profile,
    }));

    useInit(() => {
		store.actions.profile.loadProfile();
	}, []);

    const callbacks = {
        signIn: useCallback(() => store.actions.user.signIn(), [store]),
        signOut: useCallback(() => store.actions.user.signOut(), [store]),
    }

    return (
        <PageLayout>
            <Auth user={select.user} signIn={callbacks.signIn} isAuth={select.isAuth} signOut={callbacks.signOut}/>
            <Head title={t('title')}/>
            <Navigation/>
            <UserProfile profile={select.profile}/>
        </PageLayout>
    )

}

export default memo(User);