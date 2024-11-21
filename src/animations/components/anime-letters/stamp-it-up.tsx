'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const StampItUp: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine
      .add(
        '.ml60 .container_text',
        {
          scale: { from: 10, to: 1 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 1000 * i + timeFrom,
        },
        0,
      )
      .add(
        '.ml59 .cube',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 200 * (i + 1),
        },
        '<-=1200',
      );

    timeLine.add(
      '.ml60 .container',
      {
        opacity: { from: 1, to: 0 },
        ease: 'inOutQuad',
        duration: 500,
        delay: timeTo - 800,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml60">
      <div className="container">
        <div className="container_text">
          <div className="cube"></div>
          <span className="text">Hello World</span>
        </div>
        <div className="container_text">
          <div className="cube"></div>
          <span className="text">Hello World Luis</span>
        </div>
        <div className="container_text">
          <div className="cube"></div>
          <span className="text">Hello World Luis Arturo</span>
        </div>
      </div>
    </div>
  );
};

export default StampItUp;
