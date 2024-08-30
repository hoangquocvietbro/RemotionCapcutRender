'use client';
import React, { useEffect } from 'react';

import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';
interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const HelloGoodbye: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    console.log(
      document.querySelector('.ml11 .ml11_letters').getBoundingClientRect()
        .width,
    );
    spanLetters('ml11_letters');

    timeLine
      .add(
        `#${id}.ml11 .ml11_line`,
        {
          scaleY: { from: 0, to: 1 },
          opacity: { from: 0.5, to: 1 },
          duration: 700,
          ease: 'outExpo',
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml11 .ml11_line`,
        {
          translateX: {
            from: 0,
            to:
              document.querySelector('.ml11').getBoundingClientRect().width *
              1.7,
          },
          duration: 700,
          ease: 'outExpo',
          delay: 100,
        },
        '<=',
      )
      .add(
        `#${id}.ml11 .letter`,
        {
          opacity: { from: 0, to: 1 },
          duration: 600,
          ease: 'outExpo',
          delay: (el, i) => 34 * (i + 1),
        },
        '<-=775',
      );
  }, [timeLine, from, to, children]);
  return (
    <h1 className="ml11" id={id}>
      <span className="ml11_text_wrapper">
        <span className="ml11_line ml11_line1"></span>
        <span className="ml11_letters">{children}</span>
      </span>
    </h1>
  );
};

export default HelloGoodbye;
