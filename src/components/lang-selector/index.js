import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import json from '../../localization/localization.json';
import './style.css';

function Language({ id, onSelect }) {
  const cn = bem('Language');

  const array = useMemo(() => {
    const tmp = [];
    Object.keys(json.languages).forEach((key, index) => {
      tmp.push(key);
    });
    return tmp;
  }, []);

  const getStyle = useCallback(value => {
    switch (value) {
      default: return 'normal'; break;
      case id: return 'selected'; break;
    }
  }, [id, onSelect]);

  return (
    <div className={cn()}>
      {
        array.map((value, index) => {
          return <div className={cn(getStyle(value))} key={index}
            onClick={id == value ? null : () => onSelect(value)}
          >{value}</div>
        })
      }
    </div>
  );
};

Language.propTypes = {
  onSelect: PropTypes.func,
  id: PropTypes.string
}

Language.defaultProps = {
  onSelect: () => { }
}

export default React.memo(Language);