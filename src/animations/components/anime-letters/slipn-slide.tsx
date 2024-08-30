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
const SlipnSlide: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine
      .add(
        '.ml58 .cube2',
        {
          height: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml58 .text',
        {
          translateX: { from: '-100%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 300 * (i + 1),
        },
        '<-=1000',
      )
      .add(
        '.ml58 .cube1',
        {
          translateY: { from: '-100%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=500',
      );

    timeLine
      .add(
        '.ml58 .text',
        {
          translateX: { from: '0%', to: '-100%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => timeTo - 2000 + 150 * (i + 1),
        },
        0,
      )
      .add(
        '.ml58 .cube',
        {
          width: { from: '50px', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=700',
      )
      .add(
        '.ml58 .cube',
        {
          opacity: 0,
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      );
  }, [timeLine]);
  return (
    <div className="ml58">
      <div className="container">
        <div className="cube">
          <div className="container_cube1">
            <div className="cube1"></div>
          </div>
          <div className="container_cube2">
            <div className="cube2"></div>
          </div>
        </div>
        <div className="container_text">
          <h1 className="text">Hello World</h1>
          <h1 className="text">Hello World Luis</h1>
          <h1 className="text">Hello World Luis Arturo</h1>
        </div>
      </div>
    </div>
  );
};

export default SlipnSlide;
