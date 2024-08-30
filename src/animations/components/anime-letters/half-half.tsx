'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { PiWaveSineBold } from 'react-icons/pi';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const HalfHalf: React.FC<AnimatedLettersProps> = ({
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
        '.ml72 .wave',
        {
          left: { from: '-80px', to: '45%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml72 .pulse',
        {
          rotateX: { from: '0', to: '360' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml72 .wave',
        {
          opacity: 0,
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      )
      .add(
        '.ml72 .line',
        {
          width: { from: '0%', to: '100%' },
          opacity: 1,
          ease: 'inOutQuad',
          duration: 800,
        },
        '<=',
      )
      .add(
        '.ml72 .container1_text .text',
        {
          translateY: { from: '220%', to: '0' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=700',
      )
      .add(
        '.ml72 .container2_text .text',
        {
          translateY: { from: '-220%', to: '0' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      );

    timeLine
      .add(
        '.ml72 .container1_text .text',
        {
          translateY: { from: '0', to: '220%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1200,
        },
        0,
      )
      .add(
        '.ml72 .container2_text .text',
        {
          translateY: { from: '0', to: '-220%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml72 .line',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 400,
        },
        '<-=400',
      );
  }, [timeLine]);
  return (
    <div className="ml72">
      <div className="container">
        <div className="wave">
          <PiWaveSineBold className="pulse" />
          <PiWaveSineBold className="pulse" />
        </div>
        <div className="container1_text content">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis Arturo Santos</span>
        </div>
        <div className="content_line">
          <div className="line"></div>
        </div>
        <div className="container2_text content">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis Arturo Santos</span>
        </div>
      </div>
    </div>
  );
};

export default HalfHalf;
