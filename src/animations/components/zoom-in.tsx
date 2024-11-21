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
const ZoomInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml21`,
      {
        scale: { from: 0, to: 1 },
        ease: 'outExpo',
        duration: 1200,
        delay: (el, i) => 70 * i + from,
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml21" id={id} style={{ transform: `scale(0)` }}>
        {children}
      </div>
    </div>
  );
};

export default ZoomInAnimation;
