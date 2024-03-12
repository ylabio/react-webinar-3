import React, { useState } from 'react'
import "./style.css"
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function SelectLang() {
    const [selectedLang, setSelectedLang] = useState(useSelector(state =>state.locale.lang));
    const chooseLanguage = useSelector(state =>state.locale.translations.chooseLanguage)
    const store = useStore();

    const handleChange = (event) => {
        store.actions.locale.changeLang(event.target.value)
        setSelectedLang(event.target.value);
    };
    return (
        <div className="styled-select">
            {chooseLanguage}
        <select id="select" name="select" onChange={handleChange} value={selectedLang}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
        </select>
        </div>
    )
}

export default React.memo(SelectLang)