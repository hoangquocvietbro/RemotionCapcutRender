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
const TradeMark: React.FC<AnimatedLettersProps> = ({
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
        '.ml74 .container:first-child .container_text',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml74 .container:first-child .cube',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        '.ml74 .container:first-child .text',
        {
          translateY: { from: '-100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      )
      .add(
        '.ml74 .container:not(:first-child) .container_text',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        '<-=500',
      )
      .add(
        '.ml74 .container:not(:first-child) .cube',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=800',
      )
      .add(
        '.ml74 .container:not(:first-child) .text',
        {
          translateY: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      );

    timeLine
      .add(
        '.ml74 .container:not(:first-child) .text',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeTo - 1700,
        },
        0,
      )
      .add(
        '.ml74 .container:not(:first-child) .container_text',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<=',
      )
      .add(
        '.ml74 .container:not(:first-child) .cube',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      )
      .add(
        '.ml74 .container:first-child .text',
        {
          translateY: { from: '0%', to: '-100%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        '.ml74 .container:first-child .container_text',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<=',
      )
      .add(
        '.ml74 .container:first-child .cube',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      );
  }, [timeLine]);
  return (
    <div className="ml74">
      <div className="content_container">
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <div className="container_text">
            <span className="text">Hello World</span>
          </div>
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <div className="container_text">
            <span className="text">Hello World Luis Arturo Santos</span>
          </div>
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <div className="container_text">
            <span className="text">Hello World Luis Arturo Santos</span>
          </div>{' '}
        </div>
        <div className="container">
          <div className="content_cube">
            <div className="cube"></div>
          </div>
          <div className="container_text">
            <span className="text">Hello World</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeMark;
