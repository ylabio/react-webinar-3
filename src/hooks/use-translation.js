import useStore from '../store/use-store';
import * as locales from '../locales';
import useSelector from '../store/use-selector';

function useTranslation() {
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const languages = Object.keys(locales);
  const translation = locales[currentLanguage];

  function t(key) {
    if (translation) {
      return translation[key];
    }
  }

  return {
    currentLanguage,
    languages,
    t,
  };
}

export default useTranslation;
