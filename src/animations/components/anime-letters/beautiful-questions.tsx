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

const BeautifulQuestions: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml6_letters');
    timeLine.add(
      `#${id}.ml6 .letter`,
      {
        translateY: { from: '1.1em', to: 0 },
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);
  return (
    <span className="ml6" id={id}>
      <span className="ml6_text_wrapper">
        <span className="ml6_letters">{children}</span>
      </span>
    </span>
  );
};

export default BeautifulQuestions;
