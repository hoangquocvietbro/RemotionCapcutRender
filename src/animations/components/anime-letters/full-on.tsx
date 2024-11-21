'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const FullOn: React.FC<AnimatedLettersProps> = ({
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
        '.ml68 .container_text',
        {
          opacity: { from: 0, to: 1 },
          background: { from: 'rgba(0, 0, 0,0)', to: 'rgb(0, 0, 0)' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml68 .text',
        {
          translateY: { from: '100%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 200 * (i + 1),
        },
        '<-=500',
      )
      .add(
        '.ml68 .text',
        {
          strokeColor: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<=',
      )
      .add(
        '.ml68 .container_text',
        {
          background: 'rgb(16, 172, 250)',
          ease: 'inOutQuad',
          duration: 10,
          delay: timeFrom,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml68 .text',
        {
          translateX: { from: '0%', to: '-100%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => timeTo - 1000 - 400 * (2 - i),
        },
        0,
      )
      .add(
        '.ml68 .container_text',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      );
  }, [timeLine]);
  return (
    <div className="ml68">
      <div className="container_text">
        <span className="text">Hello World</span>
        <span className="text">Hello World Luis</span>
        <span className="text">Hello World Luis Arturo</span>
      </div>
    </div>
  );
};

export default FullOn;
