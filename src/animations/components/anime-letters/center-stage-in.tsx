'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const CenterStageIn: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml47 .ml47_text1`,
        {
          display: 'flex',
          translateY: { from: '100%', to: 0 },
          ease: 'inOutQuad',
          opacity: { from: 0, to: 1 },
          duration: 800,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml47 .ml47_content`,
        {
          backgroundColor: 'rgb(139, 23, 104)',
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=500',
      )
      .add(
        `#${id}.ml47 .ml47_text2`,
        {
          ease: 'inOutQuad',
          opacity: { from: 0, to: 1 },
          duration: 1000,
          delay: (el, i) => 150 * (2 - i) + from,
        },
        '<-=1000',
      )
      .add(
        `#${id}.ml47 .ml47_text1`,
        {
          display: 'none',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<+=500',
      )
      .add(
        `#${id}.ml47 .ml47_content`,
        {
          backgroundColor: 'transparent',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<+=300',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml47" id={id}>
      <div className="ml47_content1">
        <div className="ml47_text1">
          <BiSolidQuoteAltRight />
        </div>
      </div>
      <div className="ml47_content">
        <div className="ml47_content2">
          <div className="ml47_text2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CenterStageIn;
