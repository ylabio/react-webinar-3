import { useState, useRef, useEffect } from 'react';
import useStore from '../../store/use-store';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CustomLangSwitcher() {
  const store = useStore();
  const { currentLang } = useTranslate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const options = [
    { value: 'ru', label: 'ru' },
    { value: 'en', label: 'en' },
  ];

  const handleSelect = value => {
    store.actions.lang.setLang(value);
    setOpen(false);
  };

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="CustomLangSwitcher" ref={ref}>
      <div className="CustomLangSwitcher-selected" onClick={() => setOpen(prev => !prev)}>
        {currentLang}
      </div>
      {open && (
        <ul className="CustomLangSwitcher-options">
          {options.map(opt => (
            <li
              key={opt.value}
              className={`CustomLangSwitcher-option ${currentLang === opt.value ? 'active' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomLangSwitcher;
