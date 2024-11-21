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
    spanLetters('ml91_text1');
    timeLine
      .add(
        `#${id}.ml91 .ml91_text`,
        {
          scale: 1,
          opacity: 1,
          ease: 'inOutQuad',
          duration: 10,
          delay: to - 1200,
        },
        0,
      )
      .add(
        `#${id}.ml91 .ml91_text`,
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<+=500',
      )
      .add(
        `#${id}.ml91 .letter`,
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=700',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml91" id={id}>
      <p className="ml91_text">
        <BiSolidQuoteAltRight />
      </p>
      <span className="ml91_text1">{children}</span>
    </div>
  );
};

export default BunnyEars;
