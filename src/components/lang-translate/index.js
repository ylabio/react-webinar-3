import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useFetchDataLang } from './useFetchDataLang';

function LangTranslate({ LangRu, LangEng }) {
    const { language, setLanguage } = useFetchDataLang();

    if (!language) {
        return <div>Loading...</div>;
    }

    const handleRuClick = () => setLanguage('ru');
    const handleEngClick = () => setLanguage('eng');

    return (
        <div className='LangTranslate'>
            <button onClick={handleRuClick}>ru</button>
            <button onClick={handleEngClick}>eng</button>
        </div>
    );
}

LangTranslate.propTypes = {
    LangRu: PropTypes.string,
    LangEng: PropTypes.string,
};

export default memo(LangTranslate);