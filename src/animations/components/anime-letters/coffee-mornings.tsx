'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';
interface AnimatedLettersProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children: React.ReactNode;
  id: string;
}
const CoffeeMornings: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    spanLetters('ml9_letters');
    timeLine.add(
      `#${id}.ml9 .letter`,
      {
        scale: { from: 0, to: 1 },
        duration: 750,
        ease: 'inElastic(2, 0.3)',
        delay: (el, i) => 50 * i + from,
      },
      0,
    );
  }, [timeLine, from, to, children]);
  return (
    <h1 className="ml9" id={id}>
      <span className="ml9_text_wrapper">
        <span className="ml9_letters">{children}</span>
      </span>
    </h1>
  );
};

export default CoffeeMornings;
