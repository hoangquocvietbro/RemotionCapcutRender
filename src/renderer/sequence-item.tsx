import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence } from 'remotion';
import { clamp } from '../core/scene';
import MediaBackground from './main-layer-background';
import TextLayer from './components/text-layer';
import {
  IAudio,
  ICaption,
  IImage,
  IItem,
  IText,
  IVideo,
} from "@designcombo/types";

const REMOTION_SAFE_FRAME = 1;

interface SequenceItemOptions {
  fps: number;
  zIndex?: number;
}

const calculateFrames = (
  display: { from: number; to: number },
  fps: number,
) => {
  const from = (display.from / 1000) * fps;
  const durationInFrames = (display.to / 1000) * fps - from;
  return { from, durationInFrames };
};

export const SequenceItem: Record<
  string,
  (item: IItem, options: SequenceItemOptions) => JSX.Element
> = {
  text: (item, options: SequenceItemOptions) => {
    const { fps, zIndex } = options;
    const { id, details } = item as IText;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";
    return (
      <Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type} pointer-events-none`}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        data-track-item="transition-element"
        style={{
          position: "absolute",
          width: details.width || 300,
          height: details.height || 400,
          transform: details.transform || "none",
          fontSize: details.fontSize || "16px",
          textAlign: details.textAlign || "left",
          top: details.top || 300,
          left: details.left || 600,
          color: details.color || "#000000",
          backgroundColor: details.backgroundColor || "transparent",
          border: details.border || "none",
          opacity: details.opacity! / 100,
          fontFamily: details.fontFamily || "Arial",
          fontWeight: details.fontWeight || "normal",
          lineHeight: details.lineHeight || "normal",
          letterSpacing: details.letterSpacing || "normal",
          wordSpacing: details.wordSpacing || "normal",
          wordWrap: details.wordWrap || undefined,
          wordBreak: details.wordBreak || "normal",
          pointerEvents: "auto",
          textTransform: details.textTransform || "none",
          zIndex,
        }}
      >
        <TextLayer
          key={id}
          id={id}
          content={details.text}
          style={{
            position: "relative",
            textDecoration: details.textDecoration || "none",
            WebkitTextStroke: `${details.borderWidth}px ${details.borderColor}`, // Outline/stroke color and thickness
            paintOrder: "stroke fill", // Order of painting
            textShadow: boxShadowAsShadow,
          }}
        />
      </Sequence>
    );
  },
  caption: (item, options: SequenceItemOptions) => {
    const { fps, zIndex } = options;
    const { id, details } = item as ICaption;
    const { from, durationInFrames } = calculateFrames(item.display, fps);
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";
    return (
      <Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type} pointer-events-none`}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        data-track-item="transition-element"
        style={{
          position: "absolute",
          width: details.width || 300,
          height: details.height || 400,
          transform: details?.transform || "none",
          fontSize: details.fontSize || "16px",
          textAlign: details.textAlign || "left",
          top: details.top || 300,
          left: details.left || 600,
          color: details.color || "#000000",
          backgroundColor: details.backgroundColor || "transparent",
          border: details.border || "none",
          opacity: details.opacity! / 100,
          fontFamily: details.fontFamily || "Arial",
          fontWeight: details.fontWeight || "normal",
          lineHeight: details.lineHeight || "normal",
          letterSpacing: details.letterSpacing || "normal",
          wordSpacing: details.wordSpacing || "normal",
          wordWrap: details.wordWrap || "normal",
          wordBreak: details.wordBreak || "normal",
          textTransform: details.textTransform || "none",
          pointerEvents: "auto",
          zIndex,
        }}
      >
        <TextLayer
          key={id}
          id={id}
          content={details.text}
          style={{
            position: "relative",
            textDecoration: details.textDecoration || "none",
            WebkitTextStroke: `${details.borderWidth}px ${details.borderColor}`, // Outline/stroke color and thickness
            paintOrder: "stroke fill", // Order of painting
            textShadow: boxShadowAsShadow,
          }}
        />
      </Sequence>
    );
  },
  image: (item, options: SequenceItemOptions) => {
    const { fps, zIndex } = options;
    const { details } = item as IImage;
    const { from, durationInFrames } = calculateFrames(item.display, fps);

    const crop = details.crop || {
      x: 0,
      y: 0,
      width: details.width,
      height: details.height,
    };
    const boxShadowAsOutline = `0 0 0 ${details.borderWidth}px ${details.borderColor}`;
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";

    return (
      <Sequence
        key={item.id}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{ pointerEvents: "none", zIndex }}
      >
        {item.isMain && (
          <MediaBackground
            key={item.id + "background"}
            background={details.background}
          />
        )}
        <AbsoluteFill
          data-track-item="transition-element"
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
          style={{
            pointerEvents: "auto",
            top: details?.top || 0,
            left: details?.left || 0,
            width: crop.width || "100%", // Default width
            height: crop.height || "auto", // Default height
            transform: details.transform || "none",
            opacity: details?.opacity ? details.opacity / 100 : 1,
            borderRadius: `${Math.min(crop.width, crop.height) * ((details.borderRadius || 0) / 100)}px`, // Default border radius
            boxShadow:
              boxShadowAsOutline +
              (boxShadowAsShadow ? ", " + boxShadowAsShadow : ""), // Default box shadow
            overflow: "hidden",
            transformOrigin: details.transformOrigin || "center center",
            filter: `brightness(${details.brightness}%) blur(${details.blur}px)`,
            rotate: details.rotate || "0deg",
          }}
        >
          <div
            style={{
              width: details.width || "100%", // Default width
              height: details.height || "auto", // Default height
              position: "relative",
              overflow: "hidden",
              pointerEvents: "none",
              scale: `${details.flipX ? "-1" : "1"} ${
                details.flipY ? "-1" : "1"
              }`,
            }}
          >
            <Img
              style={{
                pointerEvents: "none",
                top: -crop.y || 0,
                left: -crop.x || 0,
                width: details.width || "100%", // Default width
                height: details.height || "auto", // Default height
                position: "absolute",
              }}
              data-id={item.id}
              src={details.src}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    );
  },
  video: (item, options: SequenceItemOptions) => {
    const { fps, zIndex } = options;
    const { details } = item as IVideo;
    const playbackRate = item.playbackRate || 1;
    const { from, durationInFrames } = calculateFrames(
      {
        from: item.display.from / playbackRate,
        to: item.display.to / playbackRate,
      },
      fps,
    );
    const trim = item.trim!;

    const crop = details.crop || {
      x: 0,
      y: 0,
      width: details.width,
      height: details.height,
    };
    const boxShadowAsOutline = `0 0 0 ${details.borderWidth}px ${details.borderColor}`;
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";

    return (
      <Sequence
        key={item.id}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{ pointerEvents: "none", zIndex }}
      >
        {item.isMain && (
          <MediaBackground
            key={item.id + "background"}
            background={details.background || "#ffffff"}
          />
        )}
        <AbsoluteFill
          data-track-item="transition-element"
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
          style={{
            pointerEvents: "auto",
            top: details?.top || 0,
            left: details?.left || 0,
            width: crop.width || "100%", // Default width
            height: crop.height || "auto", // Default height
            transform: details?.transform || "none",
            opacity: details?.opacity ? details.opacity / 100 : 1,
            borderRadius: `${Math.min(crop.width!, crop.height!) * ((details.borderRadius || 0) / 100)}px`, // Default border radius
            boxShadow:
              boxShadowAsOutline +
              (boxShadowAsShadow ? ", " + boxShadowAsShadow : ""), // Default box shadow
            overflow: "hidden",
            transformOrigin: details.transformOrigin || "center center",
            filter: `brightness(${details.brightness}%) blur(${details.blur}px)`,
            rotate: details.rotate || "0deg",
          }}
        >
          <div
            style={{
              width: details.width || "100%", // Default width
              height: details.height || "auto", // Default height
              position: "relative",
              overflow: "hidden",
              pointerEvents: "none",
              scale: `${details.flipX ? "-1" : "1"} ${
                details.flipY ? "-1" : "1"
              }`,
            }}
          >
            <OffthreadVideo
              startFrom={(trim.from / 1000) * fps}
              endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
              playbackRate={playbackRate}
              src={details.src}
              volume={()=>clamp(0, 100, details?.volume)}
              style={{
                pointerEvents: "none",
                top: -crop.y || 0,
                left: -crop.x || 0,
                width: details.width || "100%", // Default width
                height: details.height || "auto", // Default height
                position: "absolute",
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    );
  },
  audio: (item, options: SequenceItemOptions) => {
    const { fps, zIndex } = options;
    const { details } = item as IAudio;
    const playbackRate = item.playbackRate || 1;
    const { from, durationInFrames } = calculateFrames(
      {
        from: item.display.from / playbackRate,
        to: item.display.to / playbackRate,
      },
      fps,
    );
    const trim = item.trim!;

    return (
      <Sequence
        key={item.id}
        from={from}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          userSelect: "none",
          pointerEvents: "none",
          zIndex,
        }}
      >
        <AbsoluteFill>
          <Audio
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
            playbackRate={playbackRate}
            src={details.src}
            volume={()=>clamp(0, 100, details?.volume)}
          />
        </AbsoluteFill>
      </Sequence>
    );
  },
  element: (item: any, options: SequenceItemOptions) => {
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
  helper: (item: any, options: SequenceItemOptions) => {
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
