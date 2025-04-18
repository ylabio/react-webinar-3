import { useCallback, useLayoutEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import './style.css';


function Textarea({ placeholderText = '', ...props }) {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => {
      return props.onChange(value);
    }, 600),
    [props.onChange],
  );

  const onChangeHandler = event => {
    event.preventDefault();
    setValue(prev => event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);
  return (
    <textarea
      className="Textarea"
      value={value}
      placeholder={placeholderText ? `Ответ для ${placeholderText}` : ''}
      onChange={onChangeHandler}
    ></textarea>
  );
}

export default Textarea;
