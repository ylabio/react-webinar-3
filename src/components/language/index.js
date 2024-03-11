import { memo } from 'react'
import './style.css'

function Language({ lang, setLang, selectedLang }) {

    return (
        <div
            className={lang === selectedLang ? "Language selected" : "Language"}
            onClick={() => setLang(lang)}
        >
            {lang}
        </div>
    )
}

export default memo(Language)