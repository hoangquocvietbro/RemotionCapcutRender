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
const SunnyMornings: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml2');
    timeLine.add(
      `#${id}.ml2 .letter`,
      {
        scale: { from: 4, to: 1 },
        opacity: { from: 0, to: 1 },
        translateZ: 0,
        ease: 'outExpo',
        duration: 1000,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);

  return (
    <div>
      <span className="ml2" id={id}>
        {children}
      </span>
    </div>
  );
};

export default SunnyMornings;
