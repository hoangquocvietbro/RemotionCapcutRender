'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';

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
        `#${id}.ml85 .ml85_cube`,
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 70 * i + from,
        },
        0,
      )
      .add(
        `#${id}.ml85 .ml85_text`,
        {
          translateY: { from: '-100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=500',
      )
      .add(
        `#${id}.ml85 .ml85_cube`,
        {
          width: '0%',
          ease: 'inOutQuad',
          duration: 100,
        },
        '<+=600',
      );
  }, [timeLine, children, from, to]);
  return (
    <div className="ml85" id={id}>
      <div className="ml85_container">
        <div className="ml85_container_text">
          <div className="ml85_cube"></div>
          <span className="ml85_text">{children}</span>
        </div>
      </div>
    </div>
  );
};

export default BackDrop;
