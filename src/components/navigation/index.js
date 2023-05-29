import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {useLanguage} from "../../hooks";
import {Link} from "react-router-dom";

function Navigation() {
  const {t} = useLanguage();

  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">{t("Home")}</Link>
    </div>
  );
}

export default memo(Navigation);
