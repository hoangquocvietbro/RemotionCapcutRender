'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const WaterFall: React.FC<AnimatedLettersProps> = ({
  text,
  timeLine,
  from,
  to,
}) => {
  useEffect(() => {
    const textElements = document.querySelectorAll('.text');

    textElements.forEach((element, index) => {
      const uniqueClass = `text${index + 1}`;
      element.classList.add(uniqueClass);
    });

    textElements.forEach((element, index) => {
      const uniqueClass = `.text${index + 1}`;
      timeLine.add(
        uniqueClass,
        {
          opacity: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1200,
          delay: 500 * (index + 1) + from,
        },
        0,
      );

      if (index !== textElements.length - 1) {
        // Animación para todos los elementos excepto el último
        timeLine.add(
          uniqueClass,
          {
            opacity: { from: 1, to: 0.5 },
            ease: 'inOutQuad',
            duration: 1000,
            delay: 200 * (index + 1),
          },
          '<-=500',
        );
      }
    });

    timeLine.add(
      '.ml54 .text',
      {
        opacity: { from: 0.5, to: 0 },
        ease: 'inOutQuad',
        duration: 1000,
        delay: to - 1000,
      },
      0,
    );
  }, [timeLine]);
  return (
    <div className="ml54">
      <span className="text">{text}</span>
    </div>
  );
};

export default WaterFall;
