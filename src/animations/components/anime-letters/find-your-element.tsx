'use client';
import React, { useEffect } from 'react';

import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const FindYourElement: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    spanLetters('letters');

    timeLine
      .add(
        '.ml14 .line',
        {
          scaleX: { from: 0, to: 1 },
          opacity: { from: 0.5, to: 1 },
          ease: 'inOutExpo',
          duration: 900,
          delaY: timeFrom,
        },
        0,
      )
      .add(
        '.ml14 .letter',
        {
          opacity: { from: 0, to: 1 },
          translateX: { from: 40, to: 0 },
          translateZ: 0,
          scaleX: { from: 0.3, to: 1 },
          ease: 'outExpo',
          duration: 800,
          delay: (el, i) => 150 + 25 * i,
        },
        '<-=600',
      )
      .add(
        '.ml14',
        {
          opacity: 0,
          duration: 1000,
          ease: 'outExpo',
          delay: timeTo - 2100,
        },
        '<=',
      );
  }, []);
  return (
    <h1 className="ml14">
      <span className="text-wrapper">
        <span className="letters">{text}</span>
        <span className="line"></span>
      </span>
    </h1>
  );
};

export default FindYourElement;
