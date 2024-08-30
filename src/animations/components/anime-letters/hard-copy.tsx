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
const HardCopy: React.FC<AnimatedLettersProps> = ({
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
        '.ml49 .content2',
        {
          backgroundColor: 'transparent',
          ease: 'inOutQuad',
          duration: 1,
        },
        0,
      )
      .add(
        '.ml49 .text2',
        {
          overflow: 'hidden',
          width: { from: '0', to: '100%' },
          backgroundColor: 'white',
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 150 * (i + 1) + timeFrom,
        },
        0,
      )
      .add(
        '.ml49 .content2',
        {
          backgroundColor: 'white',
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      )

      .add(
        '.ml49 .text2',
        {
          overflow: 'initial',
          backgroundColor: 'yellow',
          width: { from: '0', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 200 * (i + 1),
        },
        '<=',
      )
      .add(
        '.ml49 .text2-span',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml49 .text2',
        {
          height: '0',
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1000,
        },
        0,
      );
  }, [text]);
  return (
    <div className="ml49">
      <div className="content">
        <div className="content2">
          <div className="text2">
            <span className="text2-span">hola mundo jajjaja</span>
          </div>
        </div>
        <div className="content2">
          <div className="text2">
            <span className="text2-span">hola mundo gaggagagagagagaagag</span>
          </div>
        </div>
        <div className="content2">
          <div className="text2">
            <span className="text2-span">
              hola mundo jajajajajajajajajajajajkakkakak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardCopy;
