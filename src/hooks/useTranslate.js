import { translations } from '../utils/translations';
import useSelector from '../store/use-selector';

export default function useTranslate() {
  const lang = useSelector(state => state.language?.currentLanguage || 'ru');
  return translations[lang] || translations.ru;
}
