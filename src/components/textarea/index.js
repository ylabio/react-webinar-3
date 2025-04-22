import { useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash.debounce';

import './style.css';

function Textarea(props) {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => {
      return props.onChange(value);
    }, 100),
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
      onChange={onChangeHandler}
    ></textarea>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
};

export default Textarea;
