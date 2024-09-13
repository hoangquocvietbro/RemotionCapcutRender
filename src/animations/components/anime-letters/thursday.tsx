'use client';
import React, { useEffect } from 'react';
import '../style.css';
import { Timeline } from '../../../lib/anime/anime';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLetterProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const Thursday: React.FC<AnimatedLetterProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml1-letters');
    timeLine
      .add(
        `#${id}.ml1`,
        {
          opacity: 1,
          duration: 10,
          ease: 'outExpo',
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml1 .ml1-line`,
        {
          width: 0,
          ease: 'outExpo',
          duration: 1,
        },
        '<-=10',
      )
      .add(
        `#${id}.ml1 .letter`,
        {
          scale: { from: 0.3, to: 1 },
          opacity: { from: 0, to: 1 },
          translateZ: 0,
          ease: 'outExpo',
          duration: 1000,
          delay: (el, i) => 70 * (i + 1),
        },
        '<=',
      )
      .add(
        `#${id}.ml1 .ml1-line`,
        {
          width: { from: '0%', to: '100%' },
          opacity: { from: 0.5, to: 1 },
          ease: 'outExpo',
          duration: 700,
          delay: (el, i) => 80 * (i + 1),
        },
        '<-=875',
      )
      .add(
        `#${id}.ml1 .ml1-line`,
        {
          opacity: 0,
          duration: 1000,
          ease: 'outExpo',
        },
        '<+=200',
      );
  }, [timeLine, to, from, children]);
  return (
    <div>
      <h1 className="ml1" id={id}>
        <span className="text-wrapper">
          <span className="ml1-line ml1-line1"></span>
          <span className="ml1-letters">{children}</span>
          <span className="ml1-line ml1-line2"></span>
        </span>
      </h1>
    </div>
  );
};

export default Thursday;
