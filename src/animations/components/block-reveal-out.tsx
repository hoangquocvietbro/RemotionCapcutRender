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
const BlockRevealOutAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml32 .ml32_block`,
        {
          width: { from: '0%', to: '100%' },
          ease: 'linear',
          duration: 800,
          delay: to - 1500,
        },
        0,
      )
      .add(
        `#${id}.ml32`,
        {
          overflow: 'hidden',
          ease: 'linear',
          duration: 10,
        },
        '<=',
      )
      .add(
        `#${id}.ml32`,
        {
          width: { from: '100%', to: '0%' },
          ease: 'linear',
          duration: 300,
        },
        '<=',
      );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml32" id={id}>
        <div className="ml32_block"></div>
        {children}
      </div>
    </div>
  );
};

export default BlockRevealOutAnimation;
