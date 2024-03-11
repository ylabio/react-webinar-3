import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

export default function LanguageToggler() {

  const store = useStore()
  const currentLanguage = useSelector(state => state.language.currentLanguage)
  const toggleLanguage = () => store.actions.language.toggleLanguage();

  const languageButtontitle = currentLanguage === 'ru'? 'Русский' : 'English'

  return <button onClick={toggleLanguage} className="LanguageToggler">{languageButtontitle}</button>
}