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
const Ribbon: React.FC<AnimatedLettersProps> = ({
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
        '.ml50 .text1',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml50 .text1-span',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=600',
      )
      .add(
        '.ml50 .content',
        {
          opacity: 1,
          ease: 'inOutQuad',
          duration: 1,
        },
        '<-=600',
      )

      .add(
        '.ml50 .text2',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        '<=',
      )
      .add(
        '.ml50 .text2-span',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=600',
      )
      .add(
        '.ml50 .text1',
        {
          width: { from: '100%', to: '0%' },
          opacity: { from: 1, to: 0.5 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )

      .add(
        '.ml50 .text2',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1400,
        },
        0,
      )
      .add(
        '.ml50 .text1-span',
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1300,
        },
        0,
      )
      .add(
        '.ml50 .text2-span',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1300,
        },
        0,
      );
  }, [text]);
  return (
    <div className="ml50">
      <div className="content1">
        <div className="text1">
          <span className="text1-span">hola mundo como estas</span>
        </div>
      </div>
      <div className="content">
        <div className="content2">
          <div className="text2">
            <span className="text2-span">hola mundo jajjaja</span>
          </div>
        </div>
        <div className="content2">
          <div className="text2">
            <span className="text2-span">hola mundo gaggagagagagagaagag</span>
          </div>
        </div>
        <div className="content2">
          <div className="text2">
            <span className="text2-span">
              hola mundo jajajajajajajajajajajajkakkakak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ribbon;
