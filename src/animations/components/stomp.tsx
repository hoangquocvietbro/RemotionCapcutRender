'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../lib/anime/anime';
import './style.css';
interface AnimatedLetterProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const StompAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml25`,
        {
          scale: 1,
          ease: 'outExpo',
          duration: 10,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml25`,
        {
          scale: { from: 4, to: 1 },
          ease: 'outExpo',
          duration: 2000,
          delay: (el, i) => 70 * i,
        },
        '<=',
      );
  }, [timeLine, from, to]);

  return (
    <div className="containerAnimation">
      <div className="ml25" id={id}>
        {children}
      </div>
    </div>
  );
};

export default StompAnimation;
