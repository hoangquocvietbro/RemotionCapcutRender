'use client';
import React, { useEffect } from 'react';

import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const ANewProductionIn: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml36');

    timeLine
      .add(
        `#${id}.ml36 .letter`,
        {
          translateX: { from: -100, to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 100 * i + from,
        },
        0,
      )
      .add(
        `#${id}.ml36 .letter`,
        {
          letterSpacing: 0,
          ease: 'inOutQuad',
          duration: 100,
        },
        '<+=500',
      );
  }, [timeLine, from, to, children]);
  return (
    <span className="ml36" id={id}>
      {children}
    </span>
  );
};

export default ANewProductionIn;
