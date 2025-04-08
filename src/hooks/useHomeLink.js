import useSelector from '../store/use-selector';
import { DEFAULT_PAGINATION } from '../constants';
import { buildLocationObject } from '../utils';

export function useHomeLink(lang) {

  const { currentPage, pageSize } = useSelector(state => ({
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
  }));

  const isDefaultPage = currentPage === DEFAULT_PAGINATION.currentPage || !currentPage;
  const isDefaultSize = pageSize === DEFAULT_PAGINATION.pageSize || !pageSize;

  const params = {};

  if (!isDefaultPage && !isDefaultSize) {
    params.page = currentPage;
    params.pageSize = pageSize;
  }

  return buildLocationObject({ lang, params });
}
