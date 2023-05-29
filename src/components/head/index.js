import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import {translate} from '../../utils'
import {cn as bem} from "@bem-react/classname";


function Head({title, onChangeLanguage, lang}) {
  const cn = bem("Head");

  const onChangeLang = useCallback((e) => {
    onChangeLanguage(e.target.value)
  })

  return (
    <div className='Head'>
      <h1>{translate(lang, title)}</h1>
      <select className={cn('select')} onChange={onChangeLang}>
        <option value='ru'>RU</option>
        <option value='en'>EN</option>
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
