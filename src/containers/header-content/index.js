import React, {useCallback} from 'react'
import SideLayout from '../../components/side-layout'
import Button from '../../components/Button'
import Head from '../../components/head'
import LocaleSelect from '../locale-select'
import Navigation from '../navigation'
import useTranslate from '../../hooks/use-translate'
import useSelector from '../../hooks/use-selector'
import {Link} from 'react-router-dom'
import useStore from '../../hooks/use-store'

const HeaderContent = ({title}) => {
    const {t} = useTranslate();
    const store = useStore();

    const select = useSelector(state => ({
        token: state.user.token,
        data: state.user.data,
    }));

    const callbacks = {
        onLeave: useCallback(() => store.actions.user.logout())
    }

    return (
        <>
            {select.token ?
                <SideLayout side={'end'}>
                    <Link to={'/profile'}>{select.data.profile.name}</Link>
                    <Button title={t('button.leave')} onLeave={callbacks.onLeave} />
                </SideLayout> :
                <SideLayout side={'end'}>
                    <Button title={t('button.enter')} link={'/login'} />
                </SideLayout>}
            <Head title={title || t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
        </>
    )
}

export default HeaderContent
