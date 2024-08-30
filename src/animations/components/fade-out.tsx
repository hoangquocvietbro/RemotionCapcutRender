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
const FadeOutAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml28`,
      {
        opacity: { from: 1, to: 0 },
        // translateY: { from: '0%', to: '-50%' },
        ease: 'inOutQuint',
        duration: 1400,
        delay: to - 1500,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml28" id={id}>
        {children}
      </div>
    </div>
  );
};

export default FadeOutAnimation;
