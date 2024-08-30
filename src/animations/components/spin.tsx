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
const SpinAnimation: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine.add(
      `#${id}.ml26`,
      {
        rotate: {
          to: 360,
          duration: 1000,
          ease: 'inOutCirc',
          delay: from,
        },
      },
      0,
    );
  }, [timeLine, from, to]);
  return (
    <div className="containerAnimation">
      <div className="ml26" id={id}>
        {children}
      </div>
    </div>
  );
};

export default SpinAnimation;
