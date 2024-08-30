'use client';
import React, { useEffect } from 'react';

import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactElement;
  id: string;
}
const ANewProductionOut: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    console.log('new production out', document.querySelector('.ml37'));
    spanLetters('ml37');
    timeLine
      .add(
        `#${id}.ml37 .letter`,
        {
          marginRight: '0.3em',
          ease: 'inOutQuad',
          duration: 10,
          delay: to - 1500,
        },
        0,
      )
      .add(
        `#${id}.ml37 .letter`,
        {
          translateX: { from: 0, to: 150 },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 30 * i,
        },
        '<+=400',
      );
  }, [timeLine, from, to, children]);
  return (
    <h1 className="ml37" id={id}>
      {children}
    </h1>
  );
};

export default ANewProductionOut;
