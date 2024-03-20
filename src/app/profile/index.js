import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
const ProfilePage = (props) => {
    const store = useStore();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const userProfile = useSelector(state => state.profile);
    useInit(async () => {
            await store.actions.profile.fetchProfile(auth.token);     
    }, [auth.token]);
    const { t } = useTranslate();

        return (
            <PageLayout>
                <Head title={t('title')}>
                    <LocaleSelect />
                </Head>
                <Navigation />
                <ProfileCard title={t('profile.title')} name={t('profile.name')} phone={t('profile.phone')} email={t('profile.email')} user={userProfile} />
            </PageLayout>
        );
    
    
};

export default memo(ProfilePage);