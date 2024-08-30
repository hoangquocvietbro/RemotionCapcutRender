'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../lib/anime/anime';
import './style.css';
import { delay } from 'lodash-es';
interface AnimatedLetterProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const WipeOutAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml30`,
      {
        overflow: 'visible',
        duration: 100,
        delay: from - 100,
      },
      0,
    );
    timeLine
      .add(
        `#${id}.ml30`,
        {
          overflow: 'hidden',
          ease: 'outExpo',
          duration: 100,
          delay: to - 1500,
        },
        0,
      )
      .add(
        `#${id}.ml30`,
        {
          width: { from: '100%', to: 0 },
          ease: 'outExpo',
          duration: 1000,
        },
        '<+=100',
      );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml30" id={id}>
        {children}
      </div>
    </div>
  );
};

export default WipeOutAnimation;
