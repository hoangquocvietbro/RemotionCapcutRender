export type ItemType =
  | "text"
  | "element"
  | "image"
  | "video"
  | "audio"
  | "helper";

export type ITransitionType =
  | "none"
  | "fade"
  | "slide"
  | "wipe"
  | "flip"
  | "clockWipe"
  | "star"
  | "circle"
  | "rectangle"
  | "slidingDoors";

export type IAnimationType =
  | "thursday"
  | "honorIn"
  | "honorOut"
  | "tumbleIn"
  | "tumbleOut"
  | "fadeOut"
  | "fadeIn"
  | "wipeIn"
  | "wipeOut"
  | "blockRevealIn"
  | "blockRevealOut"
  | "flicker"
  | "flyIn"
  | "flyOut"
  | "revealIn"
  | "revealOut"
  | "spin"
  | "stomp"
  | "zoomIn"
  | "aNewProductionIn"
  | "aNewProductionOut"
  | "backDropIn"
  | "backDropOut"
  | "beautifulQuestions"
  | "boundary"
  | "brushStroke"
  | "bunnyEarsIn"
  | "bunnyEarsOut"
  | "centerStageIn"
  | "centerStageOut"
  | "sunnyMorningsIn"
  | "greatThinkersIn"
  | "realtyBrokenIn"
  | "coffeeMorningsIn"
  | "dominoDreamsIn"
  | "helloGoodbyeIn";

export interface Size {
  width: number;
  height: number;
  name?: string;
}

export interface ITrackItem {
  id: string;
  name?: string;
  type: ItemType;
  preview?: string;
  isMain?: boolean;
  animation?: any;
  display: {
    from: number;
    to: number;
  };
  trim?: {
    from: number;
    to: number;
  };
  details: {
    preview?: string;
    src?: string;
    height?: number;
    width?: number;
    duration?: number;
    transform?: string;
    volume?: number;
    opacity?: number;
    fontFamily?: string;
    fontUrl?: string;
    fontSize?: number;
    fill?: string;
    content?: string;
    textAlign?: any;
    color?: string;
    textDecoration?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    textShadow?: string;
    backgroundColor?: string;
    fontWeight?: string;
    fontStyle?: string;
    text?: string;
    lineHeight?: string;
    letterSpacing?: string;
    wordSpacing?: string;
    WebkitTextStrokeColor?: string;
    WebkitTextStrokeWidth?: string;

    top?: number | string;
    left?: number | string;
    wordWrap?: any;
    wordBreak?: any;
    filter?: string;
    background?: string;

    transformOrigin?: string;
    crop?: any;
  };

  /* Deprecated
  top?: number | string; // test
  left?: number | string; // test
  */
  metadata?: Record<string, any>;
}

export interface ITransition {
  id: string;
  trackId: string;
  fromId: string;
  toId: string;
  type: ITransitionType;
  name?: string;
  duration: number;
  time: number;
  display: {
    from: number;
    to: number;
  };
  preview?: string;
  direction?: any;
}

export interface Design {
  id?: string;
  name?: string;
  description?: string;
  size: Size;
  duration?: number;
  fps?: number;
  projectId?: string;
  preview?: string;
  // Objects: Target[];
  trackItemIds: string[];
  trackItemsMap: Record<string, ITrackItem>; // <string, Target>
  transitionIds: string[];
  transitionsMap: Record<string, ITransition>; // <string, Transition>
}
