'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const FireworksListiele: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    spanLetters('text1-ml51');

    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;

    timeLine
      .add(
        '.ml51 .container',
        {
          display: 'block',
          ease: 'inOutQuad',
          duration: 1500,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml51 .container',
        {
          display: 'none',
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      )
      .add(
        '.ml51 .letter',
        {
          translateY: { from: -100, to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'outExpo',
          duration: 1000,
          delay: (el, i) => 30 * i,
        },
        '<=',
      )
      .add(
        '.ml51 .content2',
        {
          scale: { from: 0, to: 1 },
          ease: 'outExpo',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml51 .text2',
        {
          opacity: { from: 0, to: 1 },
          translateX: { from: '-100%', to: 0 },
          ease: 'outExpo',
          duration: 1000,
          delay: (el, i) => 30 * (i + 1),
        },
        '<-=1000',
      )

      .add(
        '.ml51 .content2',
        {
          opacity: { from: 1, to: 0.5 },
          ease: 'outExpo',
          duration: 1000,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml51 .text1-ml51',
        {
          opacity: { from: 1, to: 0 },
          ease: 'outExpo',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml51 .text2',
        {
          opacity: { from: 1, to: 0 },
          ease: 'outExpo',
          duration: 1000,
          delay: (el, i) => 100 * (i + 1),
        },
        '<-=800',
      )
      .add(
        '.ml51 .content2',
        {
          scale: { from: 1, to: 0 },
          ease: 'outExpo',
          duration: 800,
        },
        '<-=600',
      );
  }, [timeLine]);
  return (
    <div className="ml51">
      <div className="container">
        <div className="firework"></div>
      </div>
      <div className="content1">
        <h1 className="text1-ml51">{text} </h1>
      </div>
      <div className="content2">
        <div className="text2">hola mundo jajjaja</div>
        <div className="text2">hola mundo jajjaja</div>
        <div className="text2">hola mundo jajjaja</div>
      </div>
    </div>
  );
};

export default FireworksListiele;
