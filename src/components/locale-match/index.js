import { memo, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function LocaleMatch({element}) {

  const store = useStore();

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
  }));

  useEffect(() => {
    let storedLang = JSON.parse(localStorage.getItem('lang'));
    if (!storedLang) {
      storedLang = navigator.language;
    }
    if (storedLang) {
      store.actions.localization.setCurrentLanguage(storedLang);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', JSON.stringify(select.currentLanguage));
  }, [select.currentLanguage]);

  return (element);
}

export default memo(LocaleMatch);