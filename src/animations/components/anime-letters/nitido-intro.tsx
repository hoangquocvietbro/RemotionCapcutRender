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
const NitidoIntro: React.FC<AnimatedLettersProps> = ({
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
        '.ml63 .container2 .circle',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )

      .add(
        '.ml63 .container_text1',
        {
          translateY: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=800',
      )
      .add(
        '.contentml63',
        {
          padding: { from: '0px', to: '24px' },
          ease: 'inOutQuad',
          duration: 900,
        },
        '<=',
      )
      .add(
        '.ml63 .container2 .text2',
        {
          top: { from: '-100%', to: '0%' },
          ease: 'inSine',
          duration: 1000,
        },
        '<-=900',
      );

    timeLine
      .add(
        '.contentml63',
        {
          padding: { from: '24px', to: '0px' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1200,
        },
        0,
      )
      .add(
        '.ml63 .container_text1',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=800',
      )
      .add(
        '.ml63 .container2 .text2',
        {
          top: { from: '0%', to: '-100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=900',
      )
      .add(
        '.ml63 .container2 .circle',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
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
    <div className="contentml63">
      <div className="ml63">
        <div className="container1">
          <div className="container_text1">
            <span className="text1">Hello</span>
          </div>
        </div>
        <div className="container2">
          <div className="text2">Word</div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default NitidoIntro;
