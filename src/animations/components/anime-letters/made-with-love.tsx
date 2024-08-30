'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}

const MadeWithLove: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    spanLetters('ml16');
    timeLine
      .add(
        '.ml16 .letter',
        {
          translateY: { from: -100, to: 0 },
          ease: 'outExpo',
          duration: 1400,
          delay: (el, i) => 30 * i + timeFrom,
        },
        0,
      )
      .add(
        '.ml16',
        {
          opacity: 0,
          duration: 1000,
          ease: 'outExpo',
          delay: timeTo - 2500,
        },
        '<=',
      );
  }, [text]);

  return <h1 className="ml16">{text}</h1>;
};

export default MadeWithLove;
