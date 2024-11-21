'use client';
import React, { useEffect } from 'react';
import { Timeline } from '../../../lib/anime/anime';
import '../style.css';
import { FaStar } from 'react-icons/fa';
import { RiSingleQuotesL } from 'react-icons/ri';

interface AnimatedLettersProps {
  text: string;
  timeLine: Timeline;
  from: number;
  to: number;
}
const FiveStars: React.FC<AnimatedLettersProps> = ({
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
        '.ml84 .content',
        {
          height: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: timeFrom,
        },
        0,
      )
      .add(
        '.ml84 .container_cube',
        {
          justifyContent: 'start',
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      )
      .add(
        '.ml84 .quotes',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 600,
          delay: (el, i) => 300 * i,
        },
        '<-=200',
      )
      .add(
        '.ml84 .text',
        {
          opacity: { from: 0, to: 1 },
          translateY: { from: '50%', to: 0 },
          ease: 'inOutQuad',
          duration: 800,
          delay: (el, i) => 300 * i,
        },
        '<-=600',
      )
      .add(
        '.ml84 .cube',
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 800,
        },
        '<-=1000',
      )
      .add(
        '.ml84 .star',
        {
          scale: { from: 0, to: 1 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => 250 * i,
        },
        '<-=1000',
      );
    timeLine
      .add(
        '.ml84 .star',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 500,
          delay: (el, i) => timeTo - 1500 - 100 * i,
        },
        0,
      )
      .add(
        '.ml84 .text',
        {
          opacity: { from: 1, to: 0 },
          translateY: { from: '0%', to: '50%' },
          ease: 'inOutQuad',
          duration: 300,
          delay: (el, i) => 100 * i,
        },
        '<-=600',
      )
      .add(
        '.ml84 .container_cube',
        {
          justifyContent: 'end',
          ease: 'inOutQuad',
          duration: 1,
        },
        '<-=200',
      )
      .add(
        '.ml84 .cube',
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 600,
        },
        '<=',
      )
      .add(
        '.ml84 .quotes',
        {
          scale: { from: 1, to: 0 },
          ease: 'inOutQuad',
          duration: 100,
          delay: (el, i) => 100 * (2 - i),
        },
        '<-=200',
      )
      .add(
        '.ml84 .content',
        {
          height: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 500,
        },
        '<=',
      );
  }, [timeLine]);
  return (
    <div className="ml84">
      <div className="content">
        <div className="container_elements">
          <div className="container_quotes">
            <RiSingleQuotesL className="quotes quotes1" />
            <RiSingleQuotesL className="quotes quotes2" />
          </div>
          <div className="container_text">
            <span className="text">Hello World Luis jaj</span>
            <span className="text">Hello World Luis Arturo</span>
            <span className="text">Hello World</span>
            <span className="text">Hello World Luis jaj</span>
          </div>
          <div className="container_star">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>
        </div>
        <div className="container_cube">
          <div className="cube"></div>
        </div>
      </div>
    </div>
  );
};

export default FiveStars;
