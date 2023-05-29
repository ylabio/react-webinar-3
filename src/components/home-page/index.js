import {memo, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import ContentLayout from "../content-layout";
import PropTypes from 'prop-types';
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from '../../store/use-selector';
import 'style.css';

function HomePage({list, renderItem}) {
  const store = useStore();

  const select = useSelector(state => ({
    totalNumber: state.catalog.totalNumber,
    pagesCount: state.catalog.pagesCount,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
  }));

  const callbacks = {
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
  }

  const cn = bem('Home-page');

  if (list.length === 0) {
    return (
      <div>Нет данных!</div>
    );
  }

  return (
      <ContentLayout>
        <List list={list} renderItem={renderItem}/>
        <div className={cn('pagination')}>
          <Pagination 
            totalNumber={select.totalNumber}
            pagesCount={select.pagesCount}
            currentPage={select.currentPage}
            setCurrentPage={callbacks.setCurrentPage}
            limit={select.limit} />
        </div>
      </ContentLayout>
  );
}

HomePage.propTypes = {
  renderItem: PropTypes.func,
  list: PropTypes.array,
};

export default memo(HomePage);