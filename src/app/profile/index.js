import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LoginBox from '../../components/loginBox';
import ProfileCard from '../../components/profile-card';

const ProfilePage = (props) => {
    const store = useStore();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    useInit(async () => {
        await store.actions.auth.fetchProfile();
    }, []);
    


    const { t } = useTranslate();

   
        return (
            <PageLayout>
                <Head title={t('title')}>

                    <LocaleSelect />
                </Head>
                <Navigation />
                <ProfileCard title={t('profile.title')} name={t('profile.name')} phone={t('profile.phone')} email={t('profile.email')} user={auth} />
            </PageLayout>
        );
    
    
};

export default memo(ProfilePage);