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

const RevealOutAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml34`,
      {
        overflow: 'visible',
        ease: 'outExpo',
        duration: 100,
        delay: from - 100,
      },
      0,
    );
    timeLine
      .add(
        `#${id}.ml34`,
        {
          overflow: 'hidden',
          ease: 'outExpo',
          duration: 10,
          delay: to - 1100,
        },
        0,
      )
      .add(
        `#${id}.ml34 .ml34-item`,
        {
          left: { from: '0', to: '-100%' },
          ease: 'outExpo',
          duration: 1000,
        },
        '<=',
      );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml34" id={id}>
        <div className="ml34-item"> {children}</div>
      </div>
    </div>
  );
};

export default RevealOutAnimation;
