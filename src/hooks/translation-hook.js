import useSelector from '../store/use-selector';
import { translations } from '../store/translation';

export default function useTranslation() {
  const language = useSelector(state => state.language.current);

  return key => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  };
}
