'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { spanLetters } from '../../utils/span-letters';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const TicketQuote: React.FC<AnimatedLettersProps> = ({
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
        '.ml62 .container',
        {
          background: {
            from: 'rgba(124, 33, 97, 0)',
            to: 'rgba(124, 33, 97, 0.6)',
          },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml62 .quotes',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 1000,
          delay: (el, i) => 100 * (i + 1),
        },
        '<+=500',
      );
    textElements.forEach((element, index) => {
      const uniqueClass = `text${index + 1}`;
      timeLine
        .add(
          `.ml62 .${uniqueClass} .letter`,
          {
            opacity: { from: 0, to: 1 },
            ease: 'inOutQuad',
            duration: 500,
            delay: (el, i) => 100 * (i + 1) + timeFrom + 100,
          },
          0,
        )
        .add(
          `.ml62 .${uniqueClass} .letter`,
          {
            opacity: { from: 1, to: 0 },
            ease: 'inOutQuad',
            duration: 1000,
            delay: (el, i) => timeTo - 4200 + 30 * (2 - i),
          },
          '<=',
        );
    });
    timeLine
      .add(
        '.ml62 .container',
        {
          background: {
            from: 'rgba(124, 33, 97, 0.6)',
            to: 'rgba(124, 33, 97, 0)',
          },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeTo - 1000,
        },
        0,
      )
      .add(
        '.ml62 .quotes',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 100 * (i + 1),
        },
        '<-=700',
      );
  }, [timeLine]);
  return (
    <div className="ml62">
      <div className="container">
        <div className="container_text1">
          <span className="quotes">’</span>
          <span className="quotes">’</span>
        </div>
        <div className="container_text2">
          <span className="text">Hello World</span>
          <span className="text">Hello World Luis</span>
          <span className="text">Hello World Luis Arturo</span>
        </div>
      </div>
    </div>
  );
};

export default TicketQuote;
