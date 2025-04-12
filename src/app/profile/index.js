import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import LoginMenu from '../login-menu';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const store = useStore();

  useInit(() => {}, []);

  const select = useSelector(state => ({
    userData: state.authorization.userData,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // // Добавление в корзину
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <LoginMenu />
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard userData={select.userData} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
