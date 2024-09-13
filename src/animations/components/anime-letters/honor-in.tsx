'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { RiDoubleQuotesL } from 'react-icons/ri';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const HonorIn: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml88 .ml88_container_element`,
        {
          display: 'flex',
          duration: 1,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml88 .ml88_line1`,
        {
          translateX: { from: '-110%', to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: from,
        },
        '<=',
      )
      .add(
        `#${id}.ml88 .ml88_line2`,
        {
          translateX: { from: '110%', to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      )
      .add(
        `#${id}.ml88 .ml88_quotes:first-child`,
        {
          rotate: { from: '100deg', to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        `#${id}.ml88 .ml88_quotes:last-child`,
        {
          rotate: { from: '-180deg', to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        `#${id}.ml88 .ml88_text`,
        {
          translateY: { from: '-50%', to: 0 },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 250 * i,
        },
        '<-=400',
      )
      .add(
        `#${id}.ml88 .ml88_container_element`,
        {
          opacity: { from: 1, to: 0 },
          display: 'none',
          ease: 'inOutQuad',
          duration: 500,
        },
        '<+=500',
      );
  }, [timeLine, to, from]);
  return (
    <div className="ml88" id={id}>
      <div className="ml88_container">
        <div className="ml88_container_element ">
          <div className="ml88_quotes">
            <RiDoubleQuotesL />
          </div>
          <div className="ml88_content_line">
            <div className="ml88_line ml88_line1"></div>
          </div>
        </div>
        <div className="ml88_container_text">
          <span className="ml88_text">{children}</span>
        </div>
        <div className="ml88_container_element ">
          <div className="ml88_content_line">
            <div className="ml88_line ml88_line2"></div>
          </div>
          <div className="ml88_quotes">
            <RiDoubleQuotesL />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonorIn;
