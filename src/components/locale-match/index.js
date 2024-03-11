import { memo, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function LocaleMatch({forceLang, element}) {

  const store = useStore();

  const { lang } = useParams();

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
  }));

  useEffect(() => {
    let currentLanguage = select.currentLanguage;
    if (!currentLanguage) {
      if (forceLang) {
        currentLanguage = lang;
      } else {
        currentLanguage = navigator.language;
      }
      store.actions.localization.setCurrentLanguage(currentLanguage);
    }
  }, [select.currentLanguage]);

  return (element);
}

export default memo(LocaleMatch);