import {useMemo} from 'react';
import {dataLang} from "./data-lang";

export default function translate(lang) {
	const translation = useMemo(() => dataLang[lang], [lang])
  return translation
}