import useSelector from './use-selector';
import useStore from './use-store';

export default function useLanguage() {
  const store = useStore();

  const language = useSelector(state => state.language.current);

  const changeLanguage = lang => {
    store.actions.language.changeLanguage(lang);
  };

  return { language, changeLanguage };
}
