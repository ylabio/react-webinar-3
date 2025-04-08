import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationControls from "../../components/pagination-controls";
import ControlsPanel from "../../components/controls-panel";
import {useLocation, useNavigate, useSearchParams} from "react-router";
import HomeLink from "../../components/home-link";
import {useDictionary} from "../../translations/useDictionary";
import { DEFAULT_PAGINATION, OPTIONS_LIMIT, OPTIONS_LANG, KEYS } from "../../constants";
import ButtonsLang from "../../components/buttons-lang";
import PageSize from "../../components/page-size";
import PaginationView from "../../components/pagination-view";
import { buildLocationObject, buildLocationWithNewLang, buildQueryString } from "../../utils";
import { useHomeLink } from '../../hooks/useHomeLink';
import { useLabels } from '../../translations/useLabels';

function Main() {

  const {lang} = useDictionary();
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));
  const navigate = useNavigate();

  const {labelsBasketTools, labelsItems, labelsHeaderStore, labelsNavigation, labelsPagination} = useLabels();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    skip: state.catalog.skip,
    pageSize: state.catalog.pageSize,
  }));

  const linkHome = useHomeLink(lang)


  useEffect(() => {
    if (page === 0 || pageSize === 0) {
      store.actions.catalog.load({page: DEFAULT_PAGINATION.currentPage, pageSize: DEFAULT_PAGINATION.pageSize, lang});
    } else if (!page || page < DEFAULT_PAGINATION.currentPage) {
      setSearchParams({page: DEFAULT_PAGINATION.currentPage, pageSize: pageSize})
    } else if (!OPTIONS_LIMIT.includes(pageSize)) {
      setSearchParams({page: page, pageSize: DEFAULT_PAGINATION.pageSize})
    } else {
      store.actions.catalog.load({page, pageSize, lang});
    }
  }, [page, pageSize, lang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageChange: useCallback(
      ({newLimit, oldLimit, oldPage}) => {
        const oldSkip = (oldPage - 1) * oldLimit;
        const newPage = Math.floor(oldSkip / newLimit) + 1;

        navigate(buildLocationObject({lang, params: { page: newPage, pageSize: newLimit } }));
      },
      [navigate, lang]
    ),
    handleLangChange: useCallback(
      (newLang) => {
        if (newLang === lang) return;

        navigate(buildLocationWithNewLang(newLang, location));
      },
      [navigate, location, lang]
    ),
    getPageLink: useCallback(
      (page, pageSize) => {
        return buildLocationObject({
          lang,
          params: { page, pageSize },
        });
      },
      [lang]
    ),

  };

  const renders = {
    item: useCallback(
      item => {
        const lang = location.pathname.split('/')[1] || 'ru';
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            link={`/${lang}/article/${item._id}`}
            labels={labelsItems}
            linkState={{title: item.title}}
          />
        );
      },
      [callbacks.addToBasket, location]
    ),
  };

  return (
    <PageLayout>
      <Head title={labelsHeaderStore.title}>
        <ButtonsLang currentLang={lang} options={OPTIONS_LANG} onLangChange={callbacks.handleLangChange}/>
      </Head>
      <ControlsPanel>
        <nav>
          <HomeLink link={linkHome} label={labelsNavigation.linkHome}/>
        </nav>

        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} labels={labelsBasketTools}/>
      </ControlsPanel>

      <List list={select.list} renderItem={renders.item}/>

      <PaginationControls>
        <PageSize size={select.pageSize} currentPage={select.currentPage} setSize={callbacks.handlePageChange}
        label={labelsPagination.titlePageSize}/>
        <PaginationView totalPages={select.totalPages}
                        currentPage={select.currentPage}
                        pageSize={select.pageSize}
                        getPageLink={callbacks.getPageLink}
        />
      </PaginationControls>

    </PageLayout>
  );
}

export default memo(Main);
