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
const GiftWrapped: React.FC<AnimatedLettersProps> = ({
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
        '.ml71 .cube',
        {
          translateY: { from: 'calc(100% + 5px)', to: '0' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml71 .cube',
        {
          translateY: { from: '0', to: 'calc(-100% - 5px)' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<+=100',
      )
      .add(
        '.ml71 .container2',
        {
          translateY: { from: '-30px', to: '0' },
          opacity: 1,
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=800',
      )
      .add(
        '.ml71 .line',
        {
          width: { from: '100%', to: '30%' },
          opacity: 1,
          ease: 'inOutQuad',
          duration: 800,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml71 .line',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 800,
          delay: timeTo - 1000,
        },
        0,
      )
      .add(
        '.ml71 .container2',
        {
          translateY: { from: '0', to: '-30px' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=800',
      );
  }, [timeLine]);
  return (
    <div className="ml71">
      <div className="container">
        <div className="line"></div>
        <div className="cube"></div>
        <div className="container2">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis Arturo Santos</span>
          <span className="text">Hello World Luis</span>
          <span className="text">Hello World</span>
        </div>
      </div>
    </div>
  );
};

export default GiftWrapped;
