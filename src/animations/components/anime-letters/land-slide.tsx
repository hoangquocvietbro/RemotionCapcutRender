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
const LandSlide: React.FC<AnimatedLettersProps> = ({
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
        '.ml87 .container',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml87 .text',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 100,
          delay: (el, i) => 300 * i,
        },
        '<=',
      );

    timeLine.add(
      '.ml87 .container',
      {
        opacity: { from: 1, to: 0 },
        ease: 'inOutQuad',
        duration: 500,
        delay: timeTo - 600,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml87">
      <div className="container">
        <span className="text">Hello World Luis Arturo</span>
        <span className="text">Hello </span>
        <span className="text">World Luis Arturo</span>
        <span className="text">jajajaaja </span>
        <span className="text">Hello </span>
      </div>
    </div>
  );
};

export default LandSlide;
