import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence } from 'remotion';
import { IAnimationType, ITrackItem, ItemType } from '../core/types';
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
  editableTextId?: string | null;
  diffTimeInit?: number;
  diffTimeEnd?: number;
  currentTime?: number;
}

const calculateFrames = (
  display: { from: number; to: number },
  fps: number,
) => {
  const from = (display.from / 1000) * fps;
  const durationInFrames = (display.to / 1000) * fps - from;
  return { from, durationInFrames };
};

const createTextLayer = (
  id: string,
  content: string,
  style: React.CSSProperties,
) => (
  <TextLayer
    key={id}
    id={id}
    content={content}
    style={{ position: 'relative', ...style }}
  />
);

const applyAnimation = (
  animation: any,
  children: React.ReactNode,
  timeLine: Timeline,
  item: ITrackItem,
  diffTimeInit?: any,
  diffTimeEnd?: any,
  currentTime?: any,
) => {
  return Animations[animation.name as IAnimationType]({
    timeLine,
    from: item.display.from,
    to: item.display.to,
    children,
    id: item.id,
    diffTimeInit,
    diffTimeEnd,
    currentTime,
  });
};

export const SequenceItem: Record<
  ItemType,
  (item: ITrackItem, options: SequenceItemOptions) => JSX.Element
> = {
  text: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps,
      timeLine,
      diffTimeInit,
      diffTimeEnd,
      currentTime, } = options;

      const animation = item.animation || {};
      const inAnimation = animation.in;
      const outAnimation = animation.out;
      const { from, durationInFrames } = calculateFrames(item.display, fps);
      const textLayers = (
        <>
          {createTextLayer(
            item.id,
            item.details.text || '',
            {
              textDecoration: item?.details?.textDecoration || 'none',
              pointerEvents: 'none',
              wordWrap: item?.details?.wordWrap || 'normal',
              wordBreak: item?.details?.wordBreak || 'normal',
            },
          )}
        </>
      );
      let content = textLayers;
      if (inAnimation && outAnimation) {
        content = applyAnimation(
          outAnimation,
          applyAnimation(inAnimation, content, timeLine, item),
          timeLine,
          item,
          diffTimeInit,
          diffTimeEnd,
          currentTime,
        );
      } else if (inAnimation) {
        content = applyAnimation(
          inAnimation,
          content,
          timeLine,
          item,
          diffTimeInit,
          diffTimeEnd,
          currentTime,
        );
      } else if (outAnimation) {
        content = applyAnimation(
          outAnimation,
          content,
          timeLine,
          item,
          diffTimeInit,
          diffTimeEnd,
          currentTime,
        );
      }

      return (
        <Sequence
          key={item.id}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type} pointer-events-none`}
          from={from}
          durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
          data-track-item="transition-element"
          style={{
            position: 'absolute',
            width: item?.details?.width || 300,
            height: item?.details?.height || 400,
            transform: item.details?.transform || 'none',
            fontSize: item?.details?.fontSize || '16px',
            textAlign: item?.details?.textAlign || 'left',
            top: item?.details?.top || 300,
            left: item?.details?.left || 600,
            color: item?.details?.color || '#000000',
            backgroundColor: item?.details?.backgroundColor || 'transparent',
            border: item?.details?.border || 'none',
            opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
            fontFamily: item?.details?.fontFamily || 'Arial',
            textDecoration: item?.details?.textDecoration || 'none',
            fontWeight: item?.details?.fontWeight || 'normal',
            lineHeight: item?.details?.lineHeight || 'normal',
            letterSpacing: item?.details?.letterSpacing || 'normal',
            wordSpacing: item?.details?.wordSpacing || 'normal',
            wordWrap: item?.details?.wordWrap || 'normal',
            wordBreak: item?.details?.wordBreak || 'normal',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ pointerEvents: 'none', width: '100%' }}>{content}</div>
        </Sequence>
      );
  },
  image: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps, timeLine, diffTimeInit, diffTimeEnd, currentTime } = options;

    const animation = item.animation || {};
    const inAnimation = animation.in;
    const outAnimation = animation.out;

    const { from, durationInFrames } = calculateFrames(item.display, fps);

    const crop = item.details?.crop || {
      x: 0,
      y: 0,
      width: item.details.width,
      height: item.details.height,
    };

    const imageLayer = (
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          position: 'relative',
          width: item.details.width || '100%',
          height: item.details.height || 'auto',
          left: crop?.x ? -crop.x : 0,
          top: crop?.y ? -crop.y : 0,
          objectFit: 'cover',
        }}
      >
        <Img
          style={{
            pointerEvents: 'none',
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          data-id={item.id}
          src={item.details.src!}
        />
      </AbsoluteFill>
    );

    let content = imageLayer;
    if (inAnimation && outAnimation) {
      content = applyAnimation(
        outAnimation,
        applyAnimation(
          inAnimation,
          imageLayer,
          timeLine,
          item,
          diffTimeInit,
          diffTimeEnd,
          currentTime,
        ),
        timeLine,
        item,
        diffTimeInit,
        diffTimeEnd,
        currentTime,
      );
    } else if (inAnimation) {
      content = applyAnimation(
        inAnimation,
        imageLayer,
        timeLine,
        item,
        diffTimeInit,
        diffTimeEnd,
        currentTime,
      );
    } else if (outAnimation) {
      content = applyAnimation(
        outAnimation,
        imageLayer,
        timeLine,
        item,
        diffTimeInit,
        diffTimeEnd,
        currentTime,
      );
    }

    return (
      <>
        {item.isMain && (
          <MainLayerBackground
            key={item.id + 'background'}
            background={item.details.background}
          />
        )}
        <Sequence
          key={item.id}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
          from={from}
          durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
          style={{
            width: crop.width || '100%', // Default width
            height: crop.height || 'auto', // Default height
            transform: item.details?.transform || 'none',
            opacity: item?.details?.opacity ? item.details.opacity / 100 : 1,
            border: item?.details?.border || 'none', // Default border
            borderRadius: item?.details?.borderRadius || '0', // Default border radius
            boxShadow: item?.details?.boxShadow || 'none', // Default box shadow
            filter: item.details.filter || 'none',
            top: item?.details?.top || 0,
            left: item?.details?.left || 0,
            transformOrigin: item?.details?.transformOrigin || 'center center',
            overflow: 'hidden',
          }}
        >
          <div style={{ pointerEvents: 'none' }}>{content}</div>
        </Sequence>
      </>
    );
  },
  video: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    const crop = item.details?.crop || {
      x: 0,
      y: 0,
      width: item.details.width,
      height: item.details.height,
    };
    return (
      <>
        {item.isMain && (
          <MainLayerBackground
            key={item.id + 'background'}
            background={item.details.background}
          />
        )}
        <Sequence
          key={item.id}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
          from={from}
          durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
          style={{
            // width: item.details.crop?.width || item.details.width || '100%', // Default width
            // height: item.details.crop?.height || item.details.height || 'auto', // Default height
            width: crop.width || '100%', // Default width
            height: crop.height || 'auto', // Default height
            transform: item.details?.transform || 'none',
            opacity: item?.details?.opacity ? item.details.opacity / 100 : 1,
            border: item?.details?.border || 'none', // Default border
            borderRadius: item?.details?.borderRadius || '0', // Default border radius
            boxShadow: item?.details?.boxShadow || 'none', // Default box shadow
            top: item?.details?.top || 0,
            left: item?.details?.left || 0,
            overflow: 'hidden',
            transformOrigin: item?.details?.transformOrigin || 'center center',
          }}
        >
          <AbsoluteFill
            style={{
              position: 'relative',
              pointerEvents: 'none',
              width: item.details.width,
              height: item.details.height,
              top: -crop.y,
              left: -crop.x,
            }}
          >
            <OffthreadVideo
              startFrom={(trim.from / 1000) * fps}
              endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
              src={item.details.src!}
              volume={()=>clamp(0, 100, item?.details?.volume)}
              style={{
                pointerEvents: 'none',
                width: item.details.width,
                height: item.details.height,
              }}
            />
          </AbsoluteFill>
        </Sequence>
      </>
    );
  },
  audio: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    return (
      <Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        from={from}
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
      </Sequence>
    );
  },
  element: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    return (
      <Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          width: item.details.width,
          height: item.details.height,
          transform: item.details?.transform || 'none',
          opacity: item?.details?.opacity ? item.details.opacity / 100 : undefined,
          transformOrigin: item?.details?.transformOrigin || 'top left',
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
      </Sequence>
    );
  },
  helper: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    return (
      <Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          width: item.details.width,
          height: item.details.height,
          transform: item.details?.transform || 'none',
        }}
      >
        <AbsoluteFill>
          <div
            data-id={item}
            style={{
              width: item.details.width,
              height: item.details.height,
              transform: item.details?.transform || 'none',
            }}
          >
            {item.details.content}
          </div>
        </AbsoluteFill>
      </Sequence>
    );
  },
};
