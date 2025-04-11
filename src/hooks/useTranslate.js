import useSelector from '../store/use-selector';
import { i18n } from '../utils';

export const useTranslate = () => {
  const language = useSelector(state => state.settings.language);

  return key => i18n(language, key);
};
