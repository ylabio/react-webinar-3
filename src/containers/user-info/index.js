import React, { useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import AuthButton from '../../components/auth-button';
import UserProfileLink from '../../components/user-profile-link';

import { Link, useNavigate } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function UserInfo() {
    const store = useStore();
    const navigate = useNavigate();
    const { userProfile } = useSelector(state => state.auth);

    const pages = {
        profile: '/profile',
        login: '/login',
    }

    const callbacks = {
        onLogOut: useCallback(() => store.actions.auth.logOut()),
        onLogIn: useCallback(() => navigate(pages.login), [pages]),
    }

    const userButton = userProfile.name
        ? <AuthButton title='Выход' onClick={callbacks.onLogOut} />
        : <AuthButton title='Вход' onClick={callbacks.onLogIn} />

    return (
        <SideLayout side='end'>
            {userProfile.name && <UserProfileLink url={pages.profile} username={userProfile.name} />}
            {userButton}
        </SideLayout>
    )
}

UserInfo.propTypes = {
}

export default React.memo(UserInfo);