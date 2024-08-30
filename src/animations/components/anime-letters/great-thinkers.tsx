'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLetterProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const GreatThinkers: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml3');

    timeLine.add(
      `#${id}.ml3 .letter`,
      {
        opacity: { from: 0, to: 1 },
        ease: 'inOutQuad',
        duration: 1200,
        delay: (el, i) => 150 * (i + 1) + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);

  return (
    <h1 className="ml3" id={id}>
      {children}
    </h1>
  );
};

export default GreatThinkers;
