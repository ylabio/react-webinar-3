import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import HeadLogin from '../../components/head-login';
import useSelector from '../../hooks/use-selector';

function Main() {
	const store = useStore();

	const select = useSelector((state) => ({
		user: state.profile.user,
	}));

	const callbacks = {
		singOut: useCallback(() => store.actions.profile.singOut(), [store]),
	};

	useInit(() => {
			store.actions.catalog.initParams();
			store.actions.category.getCategoryFilter();
		},[],true);

	const { t } = useTranslate();

	return (
		<PageLayout>
			<HeadLogin user={select.user ? select.user : ''} singOut={callbacks.singOut} />
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<CatalogFilter />
			<CatalogList />
		</PageLayout>
	);
}

export default memo(Main);
