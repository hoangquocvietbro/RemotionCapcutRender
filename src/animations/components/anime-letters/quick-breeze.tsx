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
const QuickBreeze: React.FC<AnimatedLettersProps> = ({
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
        '.ml70 .content',
        {
          left: { from: '100%', to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 250 * i + timeFrom,
        },
        0,
      )
      .add(
        '.ml70 .content',
        {
          width: { from: '50%', to: '5px' },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 150 * (i + 1),
        },
        '<-=1000',
      )
      .add(
        '.ml70 .container2',
        {
          translateX: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml70 .text',
        {
          translateX: { from: '-100%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      );

    timeLine
      .add(
        '.ml70 .content',
        {
          left: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1200,
        },
        0,
      )
      .add(
        '.ml70 .container2',
        {
          translateX: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml70 .text',
        {
          translateX: { from: '0%', to: '-100%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 600,
        },
        '<-=800',
      );
  }, [timeLine]);
  return (
    <div className="ml70">
      <div className="cube">
        <div className="content content1"></div>
        <div className="content content2"></div>
        <div className="content content3"></div>
      </div>

      <div className="container2">
        <span className="text">Hello World</span>
        <span className="text">Hello World Luis Arturo Santos</span>
        <span className="text">Hello World</span>
        <span className="text">Hello World</span>
      </div>
    </div>
  );
};

export default QuickBreeze;
