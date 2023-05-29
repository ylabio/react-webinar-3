import useSelector from "../store/use-selector";
import useStore from "../store/use-store";
import ruTranslations from "./lang-ru.json";
import enTranslations from "./lang-en.json";

export default function renderLang(key) {
    const store = useStore();
    const lang = useSelector(state => (state.language.language));
    const translations = lang === "ru" ? ruTranslations : enTranslations;
    return translations[key] || "";
}