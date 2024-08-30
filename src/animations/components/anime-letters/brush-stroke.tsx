'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const BrushStroke: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml83_text');

    timeLine
      .add(
        `#${id}.ml83 .ml83_container_brush`,
        {
          width: { from: '0%', to: '150%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml83 .letter`,
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => 130 * i,
        },
        '<=',
      )
      .add(
        `#${id}.ml83 .ml83_container_brush`,
        {
          width: '0%',
          ease: 'inOutQuad',
          duration: 10,
        },
        '<+=500',
      );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml83" id={id}>
      <div className="ml83_content">
        <div className="ml83_container_text">
          <span className="ml83_text">{children}</span>
        </div>
        <div className="ml83_container_brush">
          <img
            src="https://ik.imagekit.io/m5f5k3axy/brush-stroke-banner-6.png?updatedAt=1723959812139"
            className="ml83_brush"
          />
        </div>
      </div>
    </div>
  );
};

export default BrushStroke;
