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
const FadeInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml19`,
      {
        opacity: { from: 0, to: 1 },
        // translateY: { from: '50%', to: '0%' },
        ease: 'linear',
        duration: 1000,
        delay: (el, i) => 150 * i + from,
      },
      0,
    );
  }, [timeLine, from, to,children]);
  return (
    <div className="containerAnimation">
      <div className="ml19" id={id}>
        {children}
      </div>
    </div>
  );
};

export default FadeInAnimation;
