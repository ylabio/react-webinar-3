import React,{memo,useCallback,useState} from 'react';
import PageLayout from '../../components/page-layout';
import LoginLayout from '../../components/login-layout';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import ProfileLayout from '../../components/profile-layout';

const ProfilePage = () => {

    
    const store = useStore();

    const select = useSelector(state => ({
        exception: state.login.exception,
        profileInfo:state.login.profileInfo
      }));
    
    
    const {t} = useTranslate();

    return (
        <PageLayout>
            <ProfileLayout
            title={t('title')}
            profileInfo={select.profileInfo}
            />
        </PageLayout>
    );
};

export default memo(ProfilePage);