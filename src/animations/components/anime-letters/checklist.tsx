'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const CheckList: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    spanLetters('text_title');
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    timeLine
      .add(
        '.ml86 .container',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml86 .letter',
        {
          translateY: { from: '1.1em', to: 0 },
          translateX: { from: '0.55em', to: 0 },
          rotateZ: { from: 180, to: 0 },
          translateZ: 0,
          ease: 'inOutQuad',
          duration: 700,
          delay: (el, i) => 50 * i,
        },
        '<-=500',
      )
      .add(
        '.ml86 .line',
        {
          translateX: { from: '-100%', to: 0 },
          translateZ: 0,
          ease: 'inOutQuad',
          duration: 700,
        },
        '<-=800',
      )
      .add(
        '.ml86 .container_subtitles .text',
        {
          translateY: { from: '50%', to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 700,
          delay: (el, i) => 50 * i,
        },
        '<-=800',
      );
    timeLine
      .add(
        '.ml86 .text_title',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeTo - 1200,
        },
        0,
      )
      .add(
        '.ml86 .line',
        {
          translateX: { from: '0', to: '-100%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      )
      .add(
        '.ml86 .container_subtitles .text',
        {
          translateY: { from: '0%', to: '50%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 700,
          delay: (el, i) => 50 * i,
        },
        '<-=800',
      )
      .add(
        '.ml86 .container',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=200',
      );
  }, [timeLine]);
  return (
    <div className="ml86">
      <div className="container">
        <div className="container_text">
          <span className="text_title">Hello World Luis jaj</span>
          <div className="line"></div>
        </div>
        <div className="container_text container_subtitles">
          <span className="text">Hello World Luis Arturo</span>
          <span className="text">Hello </span>
          <span className="text">World Luis Arturo</span>
          <span className="text">jajajaaja </span>
          <span className="text">Hello </span>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
