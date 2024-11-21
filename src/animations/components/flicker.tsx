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
const FlickerAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml24`,
      {
        opacity: {
          from: 0,
          to: 1,
          duration: 150,
          delay: (el, i) => 70 * i,
          ease: 'outExpo',
        },
        loop: 5,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml24" id={id}>
        {children}
      </div>
    </div>
  );
};

export default FlickerAnimation;
