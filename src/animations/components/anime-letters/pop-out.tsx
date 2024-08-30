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
const PopOut: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    console.log(timeFrom, timeTo);
    timeLine
      .add(
        '.ml57 .cube',
        {
          width: { from: '0%', to: 'calc(100% - 80px)' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml57 .container_text',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=600',
      )
      .add(
        '.ml57 .text',
        {
          translateX: { from: '-30%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => 200 * (i + 1),
        },
        '<-=800',
      )
      .add(
        '.ml57 .container_text',
        {
          top: { from: '0%', to: '-20px' },
          left: { from: '0%', to: '20px' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml57 .container_text',
        {
          top: { from: '-20px', to: '0%' },
          left: { from: '20px', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeTo - 1700,
        },
        0,
      )
      .add(
        '.ml57 .text',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 100 * (2 - i),
        },
        '<=',
      )
      .add(
        '.ml57 .container_text',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 300,
        },
        '<-=100',
      )
      .add(
        '.ml57 .cube',
        {
          width: { from: 'calc(100% - 80px)', to: '0%' },
          ease: 'inOutQuad',
          duration: 200,
        },
        '<=',
      );
  }, [timeLine]);
  return (
    <div className="ml57">
      <div className="cube"></div>
      <div className="container_text">
        <h1 className="text">Hello World</h1>
        <h1 className="text">Hello World Luis</h1>
        <h1 className="text">Hello World Luis Arturo</h1>
      </div>
    </div>
  );
};

export default PopOut;
