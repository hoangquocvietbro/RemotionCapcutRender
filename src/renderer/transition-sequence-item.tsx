import { AbsoluteFill, Audio, Img, OffthreadVideo } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { ITrackItem, ItemType } from '../core/types';
import { clamp } from '../core/scene';
import MainLayerBackground from './main-layer-background';
import { Animations } from '../animations';
import { Timeline } from '../lib/anime/timeline';
import TextLayer from './components/text-layer';

const REMOTION_SAFE_FRAME = 5;

interface IAnimation {
  idObject: string;
  type: string;
}

interface SequenceItemOptions {
  fps: number;
  animations?: IAnimation[];
  timeLine: Timeline;
}

const calculateFrames = (
  display: { from: number; to: number },
  fps: number,
) => {
  const from = (display.from / 1000) * fps;
  const durationInFrames = (display.to / 1000) * fps - from;
  return { durationInFrames };
};

const applyAnimation = (animation: any, children: React.ReactNode, timeLine: Timeline, item: ITrackItem) => {
  return Animations[animation.name]({
    timeLine,
    from: item.display.from,
    to: item.display.to,
    children,
    id: item.id,
  });
};


export const TransitionSequenceItem: Record<
  ItemType,
  (item: ITrackItem, options: SequenceItemOptions) => JSX.Element
> = {
  text: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps, timeLine } = options;
    const animation = item.animation || {};
    const inAnimation = animation.in;
    const outAnimation = animation.out;
    const { durationInFrames } = calculateFrames(item.display, fps);

    const textLayers = (
      <TextLayer
        key={item.id}
        id={item.id}
        content={item.details.text}
      />
    );
    let content = textLayers;

    if (inAnimation && outAnimation) {
      content = applyAnimation(
        inAnimation,
        applyAnimation(outAnimation, textLayers, timeLine, item),
        timeLine,
        item,
      );
    } else if (inAnimation) {
      content = applyAnimation(inAnimation, textLayers, timeLine, item);
    } else if (outAnimation) {
      content = applyAnimation(outAnimation, textLayers, timeLine, item);
    }

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          width: item?.details?.width || 300,
          height: item?.details?.height || 400,
          transform: item.details?.transform || 'none',
          fontSize: item?.details?.fontSize || '16px', // Updated default font size
          textAlign: item?.details?.textAlign || 'left', // Updated default text alignment
          top: item?.details?.top || 300,
          left: item?.details?.left || 600,
          color: item?.details?.color || '#000000', // Updated text color (fill)
          backgroundColor: item?.details?.backgroundColor || 'transparent', // Updated background color
          border: item?.details?.border || 'none', // Updated border
          textShadow: item?.details?.textShadow || 'none', // Updated text shadow
          opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
          fontFamily: item?.details?.fontFamily || 'Arial', // Updated default font family
          textDecoration: item?.details?.textDecoration || 'none',
          fontWeight: item?.details?.fontWeight || 'normal',
          lineHeight: item?.details?.lineHeight || 'normal', // Added line height
          letterSpacing: item?.details?.letterSpacing || 'normal', // Added letter spacing
          wordSpacing: item?.details?.wordSpacing || 'normal', // Added word spacing
        }}
      >
        <AbsoluteFill
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        >
          {content}
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  image: (item: ITrackItem, options: SequenceItemOptions) => {
    // https://placehold.co/600x400
    const src = item.details.src!;
    const { fps, timeLine } = options;
    const animation = item.animation || {};
    const inAnimation = animation.in;
    const outAnimation = animation.out;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const imageLayer = (
      <AbsoluteFill
        data-track-item="transition-element"
        style={{
          pointerEvents: 'auto',
          top: item?.details?.top || 0,
          left: item?.details?.left || 0,
          width: item.details.width || '100%', // Default width
          height: item.details.height || 'auto', // Default height
          transform: item.details?.transform || 'none',
          opacity: item?.details?.opacity ? item.details.opacity / 100 : 1,
          border: item?.details?.border || 'none', // Default border
          borderRadius: item?.details?.borderRadius || '0', // Default border radius
          boxShadow: item?.details?.boxShadow || 'none', // Default box shadow
        }}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
      >
        <Img
          style={{ pointerEvents: 'none' }}
          data-id={item.id}
          src={src}
        />
      </AbsoluteFill>
    );
    let content = imageLayer;
    if (inAnimation && outAnimation) {
      content = applyAnimation(
        inAnimation,
        applyAnimation(outAnimation, imageLayer, timeLine, item),
        timeLine,
        item,
      );
    } else if (inAnimation) {
      content = applyAnimation(inAnimation, imageLayer, timeLine, item);
    } else if (outAnimation) {
      content = applyAnimation(outAnimation, imageLayer, timeLine, item);
    }

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          pointerEvents: 'auto',
        }}
      >
        {item.isMain && (
          <MainLayerBackground background={item.details.background} />
        )}
        {content}
      </TransitionSeries.Sequence>
    );
  },
  video: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    // https://placehold.co/600x400
    const src = item.details.src!;

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          pointerEvents: 'auto',
        }}
      >
        {item.isMain && (
          <MainLayerBackground background={item.details.background} />
        )}
        <AbsoluteFill
          data-track-item="transition-element"
          style={{
            pointerEvents: 'auto',
            top: item?.details?.top || 0,
            left: item?.details?.left || 0,
            width: item.details.width || '100%', // Default width
            height: item.details.height || 'auto', // Default height
            transform: item.details?.transform || 'none',
            opacity: item?.details?.opacity ? item.details.opacity / 100 : 1,
            border: item?.details?.border || 'none', // Default border
            borderRadius: item?.details?.borderRadius || '0', // Default border radius
            boxShadow: item?.details?.boxShadow || 'none', // Default box shadow
          }}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        >
          <OffthreadVideo
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
            src={src}
            volume={()=>clamp(0, 100, item?.details?.volume)}
            style={{ pointerEvents: 'none' }}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  audio: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <AbsoluteFill>
          <Audio
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
            src={item.details.src}
            volume={()=>clamp(0, 100, item?.details?.volume)}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  element: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          width: item.details.width,
          height: item.details.height,
          transform: item.details?.transform || 'none',
          opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
        }}
      >
        <AbsoluteFill>
          <div
            data-id={item}
            style={{
              width: item.details.width,
              height: item.details.height,
              transform: item.details?.transform || 'none',
              opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
            }}
          >
            {item.details.content}
          </div>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  helper: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          width: item.details.width,
          height: item.details.height,
          transform: item.details?.transform || 'none',
          opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
        }}
      >
        <AbsoluteFill>
          <div
            data-id={item}
            style={{
              width: item.details.width,
              height: item.details.height,
              transform: item.details?.transform || 'none',
              opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
            }}
          >
            {item.details.content}
          </div>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
};
