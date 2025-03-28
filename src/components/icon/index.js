import React from 'react';
import spriteSrc from '../../assets/sprite.svg';

export default function Icon({
  name = '',
  width = 16,
  height = 16,
  className,
}) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={[spriteSrc, name].join('#')} />
    </svg>
  );
}
