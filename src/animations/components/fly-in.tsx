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
const FlyInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml18`,
      {
        translateX: { from: '-100%', to: '0%' },
        opacity: { from: 0, to: 1 },
        ease: 'outExpo',
        duration: 2000,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml18" id={id}>
        {children}
      </div>
    </div>
  );
};

export default FlyInAnimation;
