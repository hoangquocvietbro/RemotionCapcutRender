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
const RollOut: React.FC<AnimatedLettersProps> = ({
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
        '.ml46 .text1',
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
        '.ml46 .content',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1200',
      )
      .add(
        '.ml46 .text2',
        {
          ease: 'inOutQuad',
          opacity: { from: 0, to: 1 },
          duration: 1500,
          delay: (el, i) => 150 * (2 - i) + timeFrom,
        },
        '<=',
      )
      .add(
        '.ml46 .text2',
        {
          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1000,
          delay: timeTo - 2000,
        },
        0,
      )
      .add(
        '.ml46 .content',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          delay: timeTo - 1000,
        },
        0,
      )
      .add(
        '.ml46 .text1',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1500,
          delay: timeTo - 1200,
        },
        0,
      );
  }, [timeLine]);
  return (
    <div className="ml46">
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

export default RollOut;
