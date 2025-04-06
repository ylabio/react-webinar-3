import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link, useLocation} from "react-router";
import useSelector from "../../store/use-selector";
import {useDictionary} from "../../app/translations/useDictionary";

function MainLink() {

  const cn = bem('MainLink');
  const { t } = useDictionary();
  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
  }));
  const isDefaultPage = select.currentPage === 1 || !select.currentPage;
  const isDefaultSize = select.pageSize === 10 || !select.pageSize;
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'ru';

  const link = isDefaultPage && isDefaultSize
    ? `/${lang}`
    : `/${lang}/?page=${select.currentPage}&pageSize=${select.pageSize}`;

  return (
    <Link to={link} className={cn()}>{t('home')}</Link>
  );
}


export default memo(MainLink);
