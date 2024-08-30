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
const EspejoIntro: React.FC<AnimatedLettersProps> = ({
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
        '.ml18 .ml18_container',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeFrom,
        },
        0,
      )

      .add(
        '.ml18 .container1 .circle',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<=',
      )
      .add(
        '.ml18 .line',
        {
          width: { from: '0%', to: '100%' },
          left: { from: '50%', to: '0%' },
          right: { from: '50%', to: '0%' },
          opacity: { from: 0.5, to: 1 },
          ease: 'inOutQuad',
          duration: 900,
        },
        '<-=800',
      )
      .add(
        '.ml18 .container1 .text1',
        {
          scale: { from: 0, to: 1 },
          opacity: { from: 0.5, to: 1 },
          ease: 'inSine',
          duration: 1000,
        },
        '<-=800',
      )
      .add(
        '.ml18 .container2 .text2',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=800',
      );

    timeLine.add(
      '.ml18 .container3',
      {
        width: { from: '0%', to: '100%' },
        left: { from: '50%', to: '0%' },
        right: { from: '50%', to: '0%' },
        ease: 'inOutExpo',
        duration: 900,
        delay: timeTo - 1000,
      },
      0,
    );
  }, [text]);
  return (
    <div className="ml18">
      <div className="ml18_container">
        <div className="container1 container">
          <div className="circle"></div>
          <span className="text text1">Hola</span>
        </div>
        <div className="text-wrapper">
          <span className="line"></span>
        </div>
        <div className="container2 container">
          <span className="text text2">Mundo</span>
        </div>
        <div className="container3"></div>
      </div>
    </div>
  );
};

export default EspejoIntro;
