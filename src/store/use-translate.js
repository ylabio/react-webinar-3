import useSelector from './use-selector';
import { messages } from './lang/messages';

/**
 * Хук для доступа к выбранному языку
 * @return {String}
 */
export default function useTranslate() {
  const lang = useSelector((state) => state.lang.lang);
  return (message, getLocale = false) =>
    getLocale ? lang : messages[lang][message];
}
