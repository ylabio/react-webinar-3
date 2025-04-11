import { memo, useCallback, useMemo } from 'react';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import AuthForm from '../../containers/auth-form';
import UserInfoLayout from '../../components/user-info-layout';
import UserInfo from '../../containers/user-info';
import useSelector from '../../hooks/use-selector';

/**
 * Страница авторизации пользователя
 */
function Auth() {

    return (
        <>
            <UserInfoLayout>
                <UserInfo />
            </UserInfoLayout>

            <Head title={'Магазин'}>
                <LocaleSelect />
            </Head>

            <PageLayout>
                <Navigation />
                <AuthForm />
            </PageLayout>
        </>
    );
}

export default memo(Auth);
