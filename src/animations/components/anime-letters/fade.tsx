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
const Fade: React.FC<AnimatedLettersProps> = ({ text, timeLine, from, to }) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine
      .add(
        '.ml55 .text',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 200 * i + timeFrom,
        },
        0,
      )
      .add(
        '.ml55 .text',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => timeTo - 2700 + 150 * (2 - i),
        },
        '<=',
      );
  }, [timeLine]);
  return (
    <div className="ml55">
      <h1 className="text">Hello World</h1>
      <h1 className="text">Hello World Luis</h1>
      <h1 className="text">Hello World Luis Arturo</h1>
    </div>
  );
};

export default Fade;
