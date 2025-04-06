import translations from './index';
import { useLang } from './language-context';

const useTranslation = () => {
  const { lang } = useLang();

  const t = key => translations[lang]?.[key] || key;

  return { t };
};

export default useTranslation;
