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
const SubtitlesFrame: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine.add(
      '.ml77 .container',
      {
        opacity: { from: 0, to: 1 },
        ease: 'inOutQuad',
        duration: 1200,
        delay: timeFrom,
      },
      0,
    );

    timeLine.add(
      '.ml77 .container',
      {
        opacity: { from: 1, to: 0 },
        ease: 'inOutQuad',
        duration: 1200,
        delay: timeTo - 1200,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml77">
      <div className="container ">
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
    </div>
  );
};

export default SubtitlesFrame;
