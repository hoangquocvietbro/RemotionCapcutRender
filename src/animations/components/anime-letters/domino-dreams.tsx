'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const DominoDreams: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml10_letters');
    timeLine.add(
      `#${id}.ml10 .letter`,
      {
        rotateY: { from: -90, to: 0 },
        duration: 1300,
        delay: (el, i) => 45 * i + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);
  return (
    <h1 className="ml10" id={id}>
      <span className="ml10_text_wrapper">
        <span className="ml10_letters">{children}</span>
      </span>
    </h1>
  );
};

export default DominoDreams;
