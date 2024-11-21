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

const WipeInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml20`,
      {
        width: { from: '0%', to: '100%' },
        ease: 'outSine',
        duration: 1500,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml20" id={id}>
        {children}
      </div>
    </div>
  );
};

export default WipeInAnimation;
