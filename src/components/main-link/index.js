import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import {useTranslation} from "../../locales";
import './style.css';

function MainLink(props) {
  const { t } = useTranslation();
  const cn = bem('MainLink');

  return <Link className={cn()} to={'/'}>{t('mainLink')}</Link>
}

export default MainLink;