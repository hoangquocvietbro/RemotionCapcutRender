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
const DreamMeme: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine.add(
      '.ml75 .container',
      {
        opacity: { from: 0, to: 1 },
        ease: 'inOutQuad',
        duration: 1500,
        delay: timeFrom,
      },
      0,
    );

    timeLine.add(
      '.ml75 .container',
      {
        opacity: { from: 1, to: 0 },
        ease: 'inOutQuad',
        duration: 1500,
        delay: timeTo - 1500,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml75">
      <div className="container">
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
      <div className="container">
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
    </div>
  );
};

export default DreamMeme;
