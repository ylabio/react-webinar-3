import {memo, useCallback, useEffect} from 'react';
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
import MainLink from "../../components/home-link";
import {useDictionary} from "../translations/useDictionary";
import {DEFAULT_PAGINATION, OPTIONS_LIMIT, OPTIONS_LANG} from "../../constants";
import {useLang} from "../translations/useLang";
import ButtonsLang from "../../components/buttons-lang";
import PageSize from "../../components/page-size";
import PaginationView from "../../components/pagination-view";
import {buildQueryString} from "../../utils";

function Main() {

  const {t} = useDictionary();
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const lang = useLang();
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));
  const navigate = useNavigate();

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

  useEffect(() => {
    if (page === 0 || pageSize === 0) {
      store.actions.catalog.load({page: DEFAULT_PAGINATION.currentPage, pageSize: DEFAULT_PAGINATION.pageSize, lang});
    } else if (!page || page < 1) {
      setSearchParams({page: DEFAULT_PAGINATION.currentPage, pageSize: pageSize, lang})
    } else if (!OPTIONS_LIMIT.includes(pageSize)) {
      setSearchParams({page: page, pageSize: DEFAULT_PAGINATION.pageSize, lang})
    } else {
      store.actions.catalog.load({page, pageSize, lang});
    }
  }, [page, pageSize, lang]);

  /*  useEffect(() => {
      if (page > select.totalPages) {
        setSearchParams({ page: select.totalPages, pageSize: select.pageSize })
      }
    }, [page]);*/

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageChange: useCallback(
      ({newLimit, oldLimit, oldPage}) => {
        const oldSkip = (oldPage - 1) * oldLimit;
        const newPage = Math.floor(oldSkip / newLimit) + 1;

        const lang = location.pathname.split('/')[1] || 'ru';

        // Обновляем весь URL, включая язык и query
        navigate({
          pathname: `/${lang}`,
          search: `?page=${newPage}&pageSize=${newLimit}`,
        });
      },
      [navigate, location]
    ),
    handleLangChange: useCallback(
      (newLang) => {
        const currentLang = location.pathname.split('/')[1] || 'ru';
        if (newLang === currentLang) return;

        const parts = location.pathname.split('/');
        parts[1] = newLang;

        navigate(parts.join('/') + location.search);
      },
      [navigate, location]
    ),
    getPageLink: useCallback(
      (page, pageSize) => {
        return `/${lang}/${buildQueryString({ page, pageSize })}`;
      },
      [lang]),
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
          />
        );
      },
      [callbacks.addToBasket, location]
    ),
  };

  return (
    <PageLayout>
      <Head title={t('store')}>
        <ButtonsLang currentLang={lang} options={OPTIONS_LANG} onLangChange={callbacks.handleLangChange}/>
      </Head>
      <ControlsPanel>
        <MainLink/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </ControlsPanel>

      <List list={select.list} renderItem={renders.item}/>

      <PaginationControls>
        <PageSize size={select.pageSize} currentPage={select.currentPage} setSize={callbacks.handlePageChange}/>
        <PaginationView totalPages={select.totalPages}
                        currentPage={select.currentPage}
                        pageSize={select.pageSize}
                        getPageLink={callbacks.getPageLink} />
      </PaginationControls>

    </PageLayout>
  );
}

export default memo(Main);
