import {useRef, useCallback} from 'react';

export default function useDebounce(fn, delay) {

  const timerRef = useRef(null);

  function debounce(func, delay) {
    return function() {
      console.log('timerRef.current-old',timerRef.current)
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => func.apply(this, arguments), delay);
      console.log('timerRef.current - new',timerRef.current)
    };
  }

  const clear = useCallback(() => clearTimeout(timerRef.current), [timerRef]);

  return [debounce(fn, delay), clear];
}