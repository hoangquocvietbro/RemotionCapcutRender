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
const BlockRevealInAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml22`,
        {
          opacity: 1,
          overflow: 'hidden',
          ease: 'linear',
          duration: 10,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml22`,
        {
          width: { from: '0%', to: '100%' },
          ease: 'linear',
          duration: 500,
        },
        '<=',
      )
      .add(
        `#${id}.ml22 .ml22_block`,
        {
          left: '100%',
          width: { from: '101%', to: '0%' },
          ease: 'linear',
          duration: 1000,
          delay: (el, i) => 70 * i,
        },
        '<=',
      );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml22" id={id}>
        <div className="ml22_block"></div>
        {children}
      </div>
    </div>
  );
};

export default BlockRevealInAnimation;
