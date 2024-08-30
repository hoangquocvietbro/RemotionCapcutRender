'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const Follow: React.FC<AnimatedLettersProps> = ({
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
        '.ml56 .text',
        {
          translateY: { from: '120%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1200,
          delay: (el, i) => 200 * (i - 2) + timeFrom,
        },
        0,
      )
      .add(
        '.ml56 .text',
        {
          translateY: { from: '0%', to: '-120%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => timeTo - 2000 + 150 * (i - 2),
        },
        '<=',
      );
  }, [timeLine]);
  return (
    <div className="ml56">
      <div className="container_text">
        <h1 className="text">Hello World</h1>
      </div>
      <div className="container_text">
        <h1 className="text">Hello World Luis</h1>
      </div>
      <div className="container_text">
        <h1 className="text">Hello World Luis Arturo</h1>
      </div>
    </div>
  );
};

export default Follow;
