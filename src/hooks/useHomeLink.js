import useSelector from '../store/use-selector';
import { DEFAULT_PAGINATION } from '../constants';
import { buildLocationObject } from '../utils';

export function useHomeLink(lang) {

  const { skip, limit } = useSelector(state => ({
    skip: state.catalog.skip,
    limit: state.catalog.limit,
  }));

  const currentPage = Math.floor(skip / limit) + 1;
  const pageSize = limit;

  const isDefaultPage = currentPage === DEFAULT_PAGINATION.currentPage || !currentPage;
  const isDefaultSize = pageSize === DEFAULT_PAGINATION.pageSize || !pageSize;

  const params = {};

  if (!isDefaultPage || !isDefaultSize) {
    params.page = currentPage;
    params.pageSize = pageSize;
  }

  return buildLocationObject({ lang, params });
}
