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
const Meme: React.FC<AnimatedLettersProps> = ({ text, timeLine, from, to }) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine
      .add(
        '.ml76 .container1',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1200,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml76 .container2',
        {
          opacity: { from: 0, to: 0.8 },
          ease: 'inOutQuad',
          duration: 1200,
        },
        '<-=1200',
      );

    timeLine.add(
      '.ml76 .container',
      {
        opacity: { from: 0.8, to: 0 },
        ease: 'inOutQuad',
        duration: 800,
        delay: timeTo - 800,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml76">
      <div className="container container1">
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
      <div className="container container2">
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
    </div>
  );
};

export default Meme;
