import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router";
import useSelector from "../../store/use-selector";
import {useDictionary} from "../../app/translations/useDictionary";
import {DEFAULT_PAGINATION} from "../../constants";
import {useLang} from "../../app/translations/useLang";
import {buildQueryString} from "../../utils";

function HomeLink() {
  const cn = bem('HomeLink');

  const { t } = useDictionary();

  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
  }));

  const isDefaultPage = select.currentPage === DEFAULT_PAGINATION.currentPage|| !select.currentPage;
  const isDefaultSize = select.pageSize === DEFAULT_PAGINATION.pageSize || !select.pageSize;

  const lang = useLang();

  const query = buildQueryString({
    page: select.currentPage,
    pageSize: select.pageSize,
  });

  const link = isDefaultPage && isDefaultSize
    ? `/${lang}`
    : `/${lang}/${query}`;

  return (
    <Link to={link} className={cn()}>{t('home')}</Link>
  );
}

export default memo(HomeLink);
