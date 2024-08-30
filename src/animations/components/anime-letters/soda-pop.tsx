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
const SodaPop: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    timeLine
      .add(
        '.ml82 .container',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: from,
        },
        0,
      )
      .add(
        '.ml82 .cube',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 150 * i,
        },
        '<-=1000',
      )

      .add(
        '.ml82 .text',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml82 .cube',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 150 * i,
        },
        '<-=100',
      );

    timeLine.add(
      '.ml82 .container',
      {
        opacity: { from: 1, to: 0 },
        ease: 'inOutQuad',
        duration: 1000,
        delay: to - 1000,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml82">
      <div className="content">
        <div className="container">
          <span className="text">{text}</span>
        </div>
        <div className="cube cube1"></div>
        <div className="cube cube2"></div>
        <div className="cube cube3"></div>
        <div className="cube cube4"></div>
      </div>
    </div>
  );
};

export default SodaPop;
