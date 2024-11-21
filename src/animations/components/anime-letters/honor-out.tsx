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
const HonorOut: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml89 .ml89_container_element`,
        {
          opacity: 1,
          ease: 'inOutQuad',
          duration: 1,
          delay: to - 1400,
        },
        0,
      )
      .add(
        `#${id}.ml89 .ml89_line1`,
        {
          translateX: { from: '0%', to: '-110%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<+=200',
      )
      .add(
        `#${id}.ml89 .ml89_line2`,
        {
          translateX: { from: '0%', to: '110%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=500',
      )
      .add(
        `#${id}.ml89 .ml89_quotes:first-child`,
        {
          rotate: { from: '0deg', to: '100deg' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        `#${id}.ml89 .ml89_quotes:last-child`,
        {
          rotate: { from: '0deg', to: '-180deg' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        `#${id}.ml89 .ml89_text`,
        {
          translateY: { from: '0%', to: '-50%' },
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 100 * i,
        },
        '<-=400',
      );
  }, [timeLine, to, from]);
  return (
    <div className="ml89" id={id}>
      <div className="ml89_container">
        <div className="ml89_container_element ">
          <div className="ml89_quotes">
            <RiDoubleQuotesL />
          </div>
          <div className="ml89_content_line">
            <div className="ml89_line ml89_line1"></div>
          </div>
        </div>
        <div className="ml89_container_text">
          <span className="ml89_text">{children}</span>
        </div>
        <div className="ml89_container_element ">
          <div className="ml89_content_line">
            <div className="ml89_line ml89_line2"></div>
          </div>
          <div className="ml89_quotes">
            <RiDoubleQuotesL />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonorOut;
