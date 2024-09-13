'use client';
import React, { useEffect } from 'react';

import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  to: number;
  from: number;
}
const ANewProduction: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  to,
  from,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    spanLetters('ml12');
    timeLine
      .add(
        '.ml12 .letter',
        {
          translateX: { from: 40, to: 0 },
          translateZ: 0,
          opacity: { from: 0, to: 1 },
          ease: 'outExpo',
          duration: 1200,
          delay: (el, i) => timeFrom + 500 + 30 * i,
        },
        0,
      )
      .add(
        '.ml12 .letter',
        {
          translateX: { from: 0, to: 30 },
          opacity: { from: 1, to: 0 },
          ease: 'inExpo',
          duration: 1100,
          delay: (el, i) => timeTo - 3500 + 30 * i,
        },
        '<=',
      );
  }, [text]);
  return <h1 className="ml12">{text}</h1>;
};

export default ANewProduction;
