'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const StepUp: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;
    const content1Height = document
      .querySelector('.ml45 .content1-text')
      .getBoundingClientRect().height;
    setHeight(content1Height);

    timeLine
      .add(
        '.ml45 .content1-text',
        {
          height: { from: '0%', to: `${content1Height}px` },
          ease: 'inOutQuad',
          opacity: 1,
          duration: 1500,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml45 .text1',
        {
          top: { from: '-200px', to: '0px' },
          ease: 'inOutQuad',
          duration: 1000,
        },
        '<-=1400',
      )
      .add(
        '.ml45 .text2',
        {
          top: { from: '100%', to: '0%' },
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1500,
        },
        0,
      )
      .add(
        '.ml45 .text2',
        {
          top: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          opacity: { from: 1, to: 0 },
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml45 .content1-text',
        {
          height: { from: `${content1Height}px`, to: '0px' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1600,
        },
        0,
      )
      .add(
        '.ml45 .text1',
        {
          top: { from: '0px', to: '-200px' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      );
  }, [timeLine]);
  return (
    <div className="ml45">
      <div className="content1" style={{ height: `${height}px` }}>
        <div className="content1-text">
          <div className="text1">
            <span>hola mundo como estas</span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content2">
          <div className="text2">hola mundo jajjaja</div>
        </div>
        <div className="content2">
          <div className="text2">hola mundo gaggagagagagagaagag</div>
        </div>
        <div className="content2">
          <div className="text2">
            hola mundo jajajajajajajajajajajajkakkakak
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUp;
