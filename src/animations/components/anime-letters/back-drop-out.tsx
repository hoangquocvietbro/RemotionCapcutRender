'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { delay } from 'lodash-es';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const BackDrop: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml90 .ml90_cube`,
        {
          width: '0%',
          ease: 'inOutQuad',
          duration: 19,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml90 .ml90_container_text`,
        {
          overflow: 'unset',
          duration: 10,
        },
        '<=',
      );

    timeLine
      .add(
        `#${id}.ml90 .ml90_cube`,
        {
          width: '100%',
          ease: 'inOutQuad',
          delay: to - 1500,
          duration: 19,
        },
        0,
      )
      .add(
        `#${id}.ml90 .ml90_container_text`,
        {
          overflow: 'hidden',
          duration: 10,
        },
        '<=',
      )
      .add(
        `#${id}.ml90 .ml90_text`,
        {
          translateY: { from: '0%', to: '-100%' },
          ease: 'inOutQuad',
          duration: 400,
        },
        '<+=500',
      )
      .add(
        `#${id}.ml90 .ml90_cube`,
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=200',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml90" id={id}>
      <div className="ml90_container">
        <div className="ml90_container_text">
          <div className="ml90_cube"></div>
          <span className="ml90_text">{children}</span>
        </div>
      </div>
    </div>
  );
};

export default BackDrop;
