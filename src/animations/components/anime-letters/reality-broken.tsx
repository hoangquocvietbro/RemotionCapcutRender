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

const RealityBroken: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml7_letters');
    timeLine.add(
      `#${id}.ml7 .letter`,
      {
        translateY: { from: '1.1em', to: 0 },
        translateX: { from: '0.55em', to: 0 },
        translateZ: 0,
        rotateZ: { from: 180, to: 0 },
        duration: 750,
        easing: 'outExpo',
        delay: (el, i) => 50 * i + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);
  return (
    <span className="ml7" id={id}>
      <span className="ml7_text_wrapper">
        <span className="ml7_letters">{children}</span>
      </span>
    </span>
  );
};

export default RealityBroken;
