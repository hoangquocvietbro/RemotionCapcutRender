'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { CgShapeCircle } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const NewsFlash: React.FC<AnimatedLettersProps> = ({
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
        '.ml81 .cube',
        {
          translateY: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml81 .container',
        {
          translateY: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=700',
      )
      .add(
        '.ml81 .text',
        {
          translateY: { from: '50%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 150 * i,
        },
        '<-=400',
      )
      .add(
        '.ml81 .elements',
        {
          translateX: { from: '0%', to: '100%' },
          translateY: { from: '110%', to: '-20%' },
          rotate: { from: 0, to: 180 },
          ease: 'inOutQuad',
          duration: 2500,
        },
        '<-=1500',
      );

    timeLine
      .add(
        '.ml81 .text',
        {
          translateY: { from: '0%', to: '50%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => timeTo - 1500 + 150 * (i - 1),
        },
        0,
      )
      .add(
        '.ml81 .container',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=800',
      )
      .add(
        '.ml81 .cube',
        {
          translateY: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 700,
        },
        '<-=600',
      );
  }, [timeLine]);
  return (
    <div className="ml81">
      <div className="content">
        <div className="container">
          <span className="text">Hello World Luis jaj</span>
          <span className="text">Hello World Luis Arturo</span>
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis jaj</span>
        </div>
        <div className="cube"></div>
        <div className="elements">
          <ImCross className="circle" />
          <CgShapeCircle className="circle" />
          <ImCross className="circle" />
        </div>
      </div>
    </div>
  );
};

export default NewsFlash;
