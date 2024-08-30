'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const CenterStage: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml92 .ml92_content`,
        {
          ease: 'inOutQuad',
          duration: 10,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml92 .ml92_text1`,
        {
          display: 'none',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<=',
      );
    timeLine
      .add(
        `#${id}.ml92 .ml92_content`,
        {
          backgroundColor: 'rgb(139, 23, 104)',
          ease: 'inOutQuad',
          duration: 10,
          delay: to - 1500,
        },
        0,
      )
      .add(
        `#${id}.ml92 .ml92_text1`,
        {
          display: 'block',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<=',
      )
      .add(
        `#${id}.ml92 .ml92_text2`,
        {
          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1000,
        },
        '<+=300',
      )
      .add(
        `#${id}.ml92 .ml92_content`,
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=900',
      )
      .add(
        `#${id}.ml92 .ml92_text1`,
        {
          translateY: { from: '0%', to: '100%' },

          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 800,
        },
        '<-=800',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml92" id={id}>
      <div className="ml92_content1">
        <div className="ml92_text1">
          <BiSolidQuoteAltRight />
        </div>
      </div>
      <div className="ml92_content">
        <div className="ml92_content2">
          <div className="ml92_text2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CenterStage;
