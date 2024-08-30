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
const FiftyFifty: React.FC<AnimatedLettersProps> = ({
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
        '.ml69 .content',
        {
          height: { from: 0, to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml69 .container_text1 .text',
        {
          translateX: { from: '-210%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=500',
      )
      .add(
        '.ml69 .container_text2 .text',
        {
          translateX: { from: '210%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      );

    timeLine
      .add(
        '.ml69 .container_text1 .text',
        {
          translateX: { from: '0%', to: '-210%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml69 .container_text2 .text',
        {
          translateX: { from: '0%', to: '210%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml69 .content',
        {
          height: { from: '100%', to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=500',
      );
  }, [timeLine]);
  return (
    <div className="ml69">
      <div className="container container1">
        <div className="content container_text1">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis</span>
        </div>
      </div>
      <div className="container container2">
        <div className="content container_text2">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis</span>
        </div>
      </div>
    </div>
  );
};

export default FiftyFifty;
