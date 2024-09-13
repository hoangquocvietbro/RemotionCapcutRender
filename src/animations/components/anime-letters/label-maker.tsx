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
const LabelMaker: React.FC<AnimatedLettersProps> = ({
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
        '.ml73 .container_text',
        {
          width: { from: '0%', to: '100%' },
          rotate: { from: '-6deg', to: '0deg' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml73 .container:not(:first-child) .text',
        {
          translateY: { from: '-50%', to: '0%' },
          rotate: { from: '6deg', to: '0deg' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1000',
      )
      .add(
        '.ml73 .cube',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<=',
      )
      .add(
        '.ml73 .content_cube',
        {
          rotate: { from: '-6deg', to: '2deg' },
          opacity: 1,
          ease: 'inOutQuad',
          duration: 800,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml73 .container_text',
        {
          width: { from: '100%', to: '0%' },
          rotate: { from: '0deg', to: '-6deg' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml73 .container:not(:first-child) .text',
        {
          rotate: '6deg',
          translateY: { from: '0%', to: '-50%' },

          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=1000',
      )
      .add(
        '.ml73 .cube',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=500',
      );
  }, [timeLine]);
  return (
    <div className="ml73">
      <div className="content_container">
        <div className="container">
          <div className="container_text">Hello World</div>
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <span className="text">Hello World Luis Arturo Santos</span>
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>

          <span className="text">Hello World Luis Arturo Santos</span>
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <span className="text">Hello World</span>
        </div>
      </div>
    </div>
  );
};

export default LabelMaker;
