'use client';
import React, { useEffect, useState } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const TraderTitle: React.FC<AnimatedLettersProps> = ({
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
      spanLetters(`${uniqueClass}`);
    });

    const timeFrom = (from / 30) * 1000;
    const timeTo = (to / 30) * 1000;

    timeLine
      .add(
        '.ml52 .line',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 1200,
          delay: (el, i) => 150 * (i + 1) + timeFrom,
        },
        0,
      )
      .add(
        '.ml52 .line',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 900,
          delay: (el, i) => timeTo - 800 - 100 * (i + 1),
        },
        0,
      );

    textElements.forEach((element, index) => {
      const uniqueClass = `text${index + 1}`;
      timeLine
        .add(
          `.ml52 .${uniqueClass} .letter`,
          {
            opacity: { from: 0, to: 1 },
            ease: 'inOutQuad',
            duration: 1000,
            delay: (el, i) => 100 * (i + 1) + timeFrom,
          },
          0,
        )
        .add(
          `.ml52 .${uniqueClass} .letter`,
          {
            opacity: { from: 1, to: 0 },
            ease: 'inOutQuad',
            duration: 1000,
            delay: (el, i) => timeTo - 4000 + 30 * (2 - i),
          },
          '<=',
        );
    });
  }, [timeLine]);
  return (
    <div className="ml52">
      <div className="line line1"></div>
      <div className="container">
        <h1 className="text">Hello World</h1>
        <h1 className="text">Hello World Luis</h1>
        <h1 className="text">Hello World Luis Arturo</h1>
      </div>
      <div className="line line2"></div>
    </div>
  );
};

export default TraderTitle;
