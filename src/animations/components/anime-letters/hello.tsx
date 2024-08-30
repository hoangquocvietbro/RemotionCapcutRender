'use client';
import React, { useEffect } from 'react';
import { animate, Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  to: number;
  from: number;
}
const Hello: React.FC<AnimatedLettersProps> = ({
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
        '.ml8 .circle-white',
        {
          scale: { from: 0, to: 3 },
          opacity: { from: 1, to: 0 },
          ease: 'inOutExpo',
          rotateZ: 360,
          duration: 1100,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml8 .circle-container',
        {
          scale: { from: 0, to: 1 },
          duration: 1100,
          ease: 'inOutExpo',
        },
        '<-=1000',
      )
      .add(
        '.ml8 .circle-dark',
        {
          scale: { from: 0, to: 1 },
          duration: 1100,
          ease: 'outExpo',
        },
        '<-=600',
      )
      .add(
        '.ml8 .letters-left',
        {
          scale: { from: 0, to: 1 },
          duration: 1200,
        },
        '<-=550',
      )
      .add(
        '.ml8 .bang',
        {
          scale: { from: 0, to: 1 },
          rotateZ: { from: 45, to: 15 },
          duration: 1200,
        },
        '<-=1000',
      )
      .add(
        '.ml8',
        {
          opacity: 0,
          duration: 1000,
          ease: 'outExpo',
          delay: timeTo - 3400,
        },
        '<=',
      );

    animate('.ml8 .circle-dark-dashed', {
      rotateZ: 360,
      duration: 8000,
      easing: 'linear',
      loop: true,
    });
  }, []);
  return (
    <h1 className="ml8">
      <span className="letters-container">
        <span className="letters letters-left mr-3">{text}</span>
        <span className="letters bang">!</span>
      </span>
      <span className="circle circle-white"></span>
      <span className="circle circle-dark"></span>
      <span className="circle circle-container">
        <span className="circle circle-dark-dashed"></span>
      </span>
    </h1>
  );
};

export default Hello;
