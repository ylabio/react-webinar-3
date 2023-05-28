import {memo} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { languageConfig } from "../../languages";
import useSelector from "../../store/use-selector";

function Navigation() {
  const location = useLocation();
  const language = useSelector(state => state.language.language);
  const mainPageLabel = language === 'RU' ? languageConfig.main.rus : languageConfig.main.eng;

  return (
    <div>
      {location.pathname!=='/' && <NavLink to="/">{mainPageLabel}</NavLink>}
    </div>
  );
}

export default memo(Navigation);
