'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const BunnyEars: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml42_text1');
    timeLine
      .add(
        `#${id}.ml42 .ml42_text`,
        {
          display: 'flex',
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          opacity: 0.7,
          duration: 500,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml42 .letter`,
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => 100 * (i + 1),
        },
        '<-=400',
      )
      .add(
        `#${id}.ml42 .ml42_text`,
        {
          display: 'none',
          ease: 'inOutQuad',
          duration: 100,
        },
        '<+=500',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml42" id={id}>
      <p className="ml42_text">
        <BiSolidQuoteAltRight />
      </p>
      <span className="ml42_text1">{children}</span>
    </div>
  );
};

export default BunnyEars;
