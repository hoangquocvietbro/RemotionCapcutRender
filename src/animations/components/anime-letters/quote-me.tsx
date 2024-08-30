'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../../../lib/anime/anime';
import '../style.css';
import { IoMdQuote } from 'react-icons/io';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const QuoteMe: React.FC<AnimatedLettersProps> = ({
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
        '.ml67 .container2',
        {
          width: { from: 0, to: '28%' },
          ease: 'inOutQuad',
          duration: 1000,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml67 .container1',
        {
          translateY: { from: '120%', to: 0 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=700',
      )
      .add(
        '.ml67 .quote',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=500',
      )
      .add(
        '.ml67 .text',
        {
          opacity: { from: 0, to: 1 },
          translateY: { from: '100%', to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 200 * (i + 1),
        },
        '<-=500',
      );

    timeLine
      .add(
        '.ml67 .container2',
        {
          width: { from: '28%', to: 0 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => timeTo - 1500,
        },
        0,
      )
      .add(
        '.ml67 .text',
        {
          opacity: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=700',
      )
      .add(
        '.ml67 .quote',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<-=400',
      )
      .add(
        '.ml67 .container1',
        {
          translateY: { from: '0', to: '120%' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=100',
      );
  }, [timeLine]);
  return (
    <div className="ml67">
      <div className="container1">
        <div className="container_text1">
          <IoMdQuote className="quote" />
        </div>
        <div className="container_text2">
          <span className="text">Hello World</span>
          <span className="text">Hello</span>
          <span className="text">Hello World Luis</span>
        </div>
        <div className="container_text3">
          <span className="text">Luis Arturo Santos</span>
        </div>
      </div>
      <div className="container2"></div>
    </div>
  );
};

export default QuoteMe;
