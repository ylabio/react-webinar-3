import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import langData from '../langData.json';

export function useTranslation() {
  const store = useStore();
  const lang = useSelector(state => state.lang) || 'ru';

  const t = (key) => {
    return langData[lang]?.[key] || key;
  };

  const setLang = (newLang) => {
    store.setLang(newLang);
  };

  return { t, setLang, lang };
} 