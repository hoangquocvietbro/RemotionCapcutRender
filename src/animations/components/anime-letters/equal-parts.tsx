'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const EqualParts: React.FC<AnimatedLettersProps> = ({
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
        '.ml48 .text1',
        {
          translateY: { from: '100%', to: 0 },

          ease: 'inOutQuad',
          opacity: { from: 0, to: 1 },
          duration: 1500,
          delay: timeFrom,
        },
        0,
      )

      .add(
        '.ml48 .text2',
        {
          ease: 'inOutQuad',
          opacity: { from: 0, to: 1 },
          duration: 1500,
          delay: (el, i) => 150 * (2 - i) + timeFrom,
        },
        '<-=1000',
      )
      .add(
        '.ml48 .text2',
        {
          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1000,
          delay: timeTo - 1000,
        },
        0,
      )

      .add(
        '.ml48 .text1',
        {
          translateY: { from: '0%', to: '100%' },

          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1500,
        },
        '<-=1500',
      );
  }, [timeLine]);
  return (
    <div className="ml48">
      <div className="content1">
        <div className="text1">hola mundo como estas</div>
      </div>
      <div className="content">
        <div className="content2">
          <div className="text2">hola mundo jajjaja</div>
        </div>
        <div className="content2">
          <div className="text2">hola mundo gaggagagagagagaagag</div>
        </div>
        <div className="content2">
          <div className="text2">
            hola mundo jajajajajajajajajajajajkakkakak
          </div>
        </div>
      </div>
    </div>
  );
};

export default EqualParts;
