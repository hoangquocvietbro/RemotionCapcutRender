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
const RisingStrongIn: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    spanLetters('ml38');

    timeLine
      .add(
        '.ml38 .letter',
        {
          translateY: { from: 100, to: 0 },
          translateZ: 0,
          opacity: { from: 0, to: 1 },
          ease: 'outExpo',
          duration: 1400,
          delay: (el, i) => 300 + 30 * i + timeFrom,
        },
        0,
      )
      .add(
        '.ml38 .letter',
        {
          opacity: { from: 1, to: 0 },
          ease: 'outExpo',
          duration: 1000,
          delay: timeTo - 2800,
        },
        '<=',
      );
  }, []);
  return <h1 className="ml38">{text}</h1>;
};

export default RisingStrongIn;
