import {useSelectorTranslate} from '../hooks/use-selector-translate';
import * as translations from '../i18n/translations';

export default function useTranslate() {

  const select = useSelectorTranslate(state => ({
    language: state.translate.language
  }));

  const language = select.language;

  const t = function translate( text, plural, lang = language) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
  return {t, language}
}
