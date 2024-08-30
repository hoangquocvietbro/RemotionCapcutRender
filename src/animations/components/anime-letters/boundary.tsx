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
const Boundary: React.FC<AnimatedLettersProps> = ({
  timeLine,
  from,
  to,
  children,
  id,
}) => {
  useEffect(() => {
    timeLine
      .add(
        `#${id}.ml61 .ml61_cube1`,
        {
          height: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 500,
          delay: from,
        },
        0,
      )
      .add(
        `#${id}.ml61 .ml61_line1`,
        {
          width: { from: '0%', to: '100%' },
          ease: 'inOutQuad',
          duration: 200,
        },
        '<-=500',
      )
      .add(
        `#${id}.ml61 .ml61_line2`,
        {
          height: { from: '0%', to: 'calc(100% + 5px)' },
          ease: 'inOutQuad',
          duration: 200,
        },
        '<=',
      )
      .add(
        `#${id}.ml61 .ml61_line3`,
        {
          translateX: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 200,
        },
        '<=',
      )
      .add(
        `#${id}.ml61 .ml61_line4`,
        {
          translateY: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 200,
        },
        '<=',
      )
      .add(
        `#${id}.ml61 .ml61_text`,
        {
          opacity: 1,
          ease: 'inOutQuad',
          duration: 1,
        },
        '<=',
      )
      .add(
        `#${id}.ml61 .ml61_cube1`,
        {
          width: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 300,
        },
        '<=',
      )
      .add(
        `#${id}.ml61 .ml61_line`,
        {
          height: { from: '100%', to: '0%' },
          ease: 'inOutQuad',
          duration: 10,
        },
        '<+=600',
      );

    // timeLine
    //   .add(
    //     `#${id}.ml61 .ml61_text`,
    //     {
    //       opacity: { from: 1, to: 0 },
    //       ease: 'inOutQuad',
    //       duration: 800,
    //       delay: to - 1100,
    //     },
    //     0,
    //   )
    //   .add(
    //     `#${id}.ml61 .ml61_line`,
    //     {
    //       height: { from: '100%', to: '0%' },
    //       ease: 'inOutQuad',
    //       duration: 400,
    //     },
    //     '<-=100',
    //   );
  }, [timeLine, from, to, children]);
  return (
    <div className="ml61" id={id}>
      <div className="ml61_container">
        <div className="ml61_container_text">
          <div className="ml61_cube">
            <div className="ml61_cube1"></div>
          </div>
          <span className="ml61_text">{children}</span>
        </div>
        <div className="ml61_line">
          <div className="ml61_line1"></div>
          <div className="ml61_line2"></div>
          <div className="ml61_line3"></div>
          <div className="ml61_line4"></div>
        </div>
      </div>
    </div>
  );
};

export default Boundary;
