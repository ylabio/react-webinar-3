import {useCallback, useLayoutEffect, useState} from "react";
import debounce from "lodash.debounce";

function Textarea({placeholderText = '', ...props }) {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => {
      return props.onChange(value.trim());
    }, 600),
    [props.onChange],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(prev => event.target.value);

    onChangeDebounce( event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);
  return (
    <textarea
      className="ArticleForm-text"
      cols="30"
      rows="10"
      value={value}
      placeholder={placeholderText ? `Ответ для ${placeholderText}` : ''}
      onChange={onChangeHandler}
    ></textarea>
  );
}

export default Textarea;
