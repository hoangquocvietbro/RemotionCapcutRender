import React from 'react';
import { Timeline } from '../../../lib/anime/timeline';
import {
  ANewProductionIn,
  ANewProductionOut,
  BackDropIn,
  BackDropOut,
  BeautifulQuestions,
  BlockRevealIn,
  BlockRevealOut,
  Boundary,
  BrushStroke,
  BunnyEarsIn,
  BunnyEarsOut,
  CenterStageIn,
  CenterStageOut,
  CoffeeMorningsIn,
  DominoDreamsIn,
  FadeIn,
  FadeOut,
  Flicker,
  FlyIn,
  FlyOut,
  GreatThinkersIn,
  HelloGoodbyeIn,
  HonorIn,
  HonorOut,
  RealityBrokenIn,
  RevealIn,
  RevealOut,
  Spin,
  Stomp,
  SunnyMorningsIn,
  Thursday,
  TumbleIn,
  TumbleOut,
  WipeIn,
  WipeOut,
  ZoomIn,
} from './components';
import { IAnimationType } from '../../timeline/timeline-manager/interfaces';

interface AnimatedLetterProps {
  timeLine: Timeline;
  from: number;
  to: number;
  children?: React.ReactNode;
  id: string;
}

const animationComponents: Record<
  IAnimationType,
  React.ComponentType<AnimatedLetterProps>
> = {
  thursday: Thursday,
  tumbleIn: TumbleIn,
  tumbleOut: TumbleOut,
  honorIn: HonorIn,
  honorOut: HonorOut,
  fadeOut: FadeOut,
  fadeIn: FadeIn,
  wipeIn: WipeIn,
  wipeOut: WipeOut,
  blockRevealIn: BlockRevealIn,
  blockRevealOut: BlockRevealOut,
  flicker: Flicker,
  flyIn: FlyIn,
  flyOut: FlyOut,
  revealIn: RevealIn,
  revealOut: RevealOut,
  spin: Spin,
  stomp: Stomp,
  zoomIn: ZoomIn,
  aNewProductionIn: ANewProductionIn,
  aNewProductionOut: ANewProductionOut,
  backDropIn: BackDropIn,
  backDropOut: BackDropOut,
  beautifulQuestions: BeautifulQuestions,
  boundary: Boundary,
  brushStroke: BrushStroke,
  bunnyEarsIn: BunnyEarsIn,
  bunnyEarsOut: BunnyEarsOut,
  centerStageIn: CenterStageIn,
  centerStageOut: CenterStageOut,
  sunnyMorningsIn: SunnyMorningsIn,
  greatThinkersIn: GreatThinkersIn,
  realtyBrokenIn: RealityBrokenIn,
  coffeeMorningsIn: CoffeeMorningsIn,
  dominoDreamsIn: DominoDreamsIn,
  helloGoodbyeIn: HelloGoodbyeIn,
};

const createAnimationComponent =
  (Component: React.ComponentType<AnimatedLetterProps>) =>
  ({ from, to, timeLine, children, id }: AnimatedLetterProps) => (
    <Component timeLine={timeLine} from={from} to={to} id={id}>
      {children}
    </Component>
  );

const Animations: Record<
  IAnimationType,
  (props: AnimatedLetterProps) => JSX.Element
> = Object.fromEntries(
  Object.entries(animationComponents).map(([key, Component]) => [
    key,
    createAnimationComponent(Component),
  ]),
) as Record<IAnimationType, (props: AnimatedLetterProps) => JSX.Element>;

export default Animations;
