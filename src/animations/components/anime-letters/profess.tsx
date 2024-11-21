'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { RiSingleQuotesL } from 'react-icons/ri';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const Profess: React.FC<AnimatedLettersProps> = ({
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
        '.ml66 .text',
        {
          opacity: { from: 0, to: 1 },
          translateX: { from: '-100%', to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 100 * (i + 1) + timeFrom,
        },
        0,
      )
      .add(
        '.ml66 .children',
        {
          rotate: { from: '-90deg', to: '0deg' },
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=700',
      )
      .add(
        '.ml66 .children2',
        {
          left: { from: '0', to: '-30px' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<=',
      );

    timeLine
      .add(
        '.ml66 .children',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => timeTo - 1000 - 100 * (2 - i),
        },
        0,
      )
      .add(
        '.ml66 .text',
        {
          opacity: { from: 1, to: 0 },
          translateX: { from: '0', to: '-100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 100 * (i + 1),
        },
        '<-=600',
      );
  }, [timeLine]);
  return (
    <div className="ml66">
      <div className="container">
        <div className="container_text2">
          <div className="container_text">
            <div className="container_text1">
              <div className="children children1">
                <RiSingleQuotesL />
              </div>
              <div className="children children2">
                <RiSingleQuotesL />
              </div>
            </div>
            <div className="text">Hello World</div>
          </div>
          <span className="text">Hello World Luis</span>
          <span className="text">Hello World Luis Arturo</span>
        </div>
      </div>
    </div>
  );
};

export default Profess;
