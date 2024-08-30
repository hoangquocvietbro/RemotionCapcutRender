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

const RevealInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml33 .ml33-item`,
      {
        left: { from: '-100%', to: '0%' },
        ease: 'outExpo',
        duration: 1000,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml33" id={id}>
        <div className="ml33-item"> {children}</div>
      </div>
    </div>
  );
};

export default RevealInAnimation;
