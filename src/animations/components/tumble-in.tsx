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

const TumbleInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml23`,
      {
        translateY: { from: '-50%', to: '0%' },
        translateX: { from: '-150%', to: '0%' },
        opacity: { from: 0, to: 1 },
        rotate: { from: -60, to: 0 },
        ease: 'outExpo',
        duration: 1000,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to]);

  return (
    <div>
      <div className="ml23" id={id}>{children}</div>
    </div>
  );
};

export default TumbleInAnimation;

