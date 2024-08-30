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
const ZambullirseIntroOutroLeft: React.FC<AnimatedLettersProps> = ({
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
        '.children64',
        {
          width: { from: '0%', to: '50%' },
          ease: 'inOutQuad',
          duration: 1500,
          delay: timeFrom,
        },
        0,
      )

      .add(
        '.ml64 .contentCircle .circle',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )

      .add(
        '.ml64 .contentWord .text',
        {
          translateX: { from: '-100%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 100 + 150 * i,
        },
        '<-=800',
      );

    timeLine
      .add(
        '.children64',
        {
          width: { from: '50%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1200,
        },
        0,
      )
      .add(
        ['.ml64 .contentCircle', '.ml64 .contentWord'],
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      );
  }, [text]);
  return (
    <div className="contentml64">
      <div className="children64">
        <div className="sidebar"></div>
        <div className="ml64">
          <div className="contentCircle">
            <div className="circle"></div>
          </div>
          <div className="contentWord">
            <span className="text text1">HELLO</span>
            <span className="text text2">HELLO-WORD.COM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZambullirseIntroOutroLeft;
