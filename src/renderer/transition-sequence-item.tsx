import { AbsoluteFill, Audio, Img, OffthreadVideo } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { clamp } from '../core/scene';
import MediaBackground from './main-layer-background';
import TextLayer from './components/text-layer';
import {
  IAudio,
  ICaption,
  IImage,
  IItem,
  IText,
  ITrackItem,
  ITransition,
  IVideo,
} from "@designcombo/types";

const REMOTION_SAFE_FRAME = 5;

interface SequenceItemOptions {
  fps: number;
  containTransition?: ITransition;
}

const calculateFrames = (
  display: { from: number; to: number },
  fps: number,
) => {
  const from = (display.from / 1000) * fps;
  const durationInFrames = (display.to / 1000) * fps - from;
  return { durationInFrames };
};

export const TransitionSequenceItem: Record<
string,
  (item: IItem, options: SequenceItemOptions) => JSX.Element
> = {
  text: (item: ITrackItem, options: SequenceItemOptions) => {
    const { id, details } = item as IText;
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
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
      </TransitionSeries.Sequence>
    );
  },
  image: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps, containTransition } = options;
    const { details } = item as IImage;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const crop = details?.crop || {
      x: 0,
      y: 0,
      width: details.width,
      height: details.height,
    };
    const boxShadowAsOutline = `0 0 0 ${details.borderWidth}px ${details.borderColor}`;
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";
    let extraTimeTransition = 0;
    if (containTransition && containTransition.type !== "none") {
      const { durationInFrames } = calculateFrames(
        { from: 0, to: containTransition.duration },
        fps,
      );
      extraTimeTransition = durationInFrames;
    } else if (containTransition && containTransition.type === "none") {
      extraTimeTransition = 2;
    }

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={
          durationInFrames + REMOTION_SAFE_FRAME + extraTimeTransition / 2
        }
        style={{
          pointerEvents: "auto",
        }}
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
      </TransitionSeries.Sequence>
    );
  },
  video: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps, containTransition } = options;
    const { details } = item as IVideo;
    const playbackRate = item.playbackRate || 1;
    const { durationInFrames } = calculateFrames(
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
    let extraTimeTransition = 0;
    if (containTransition && containTransition.type !== "none") {
      const { durationInFrames } = calculateFrames(
        { from: 0, to: containTransition.duration },
        fps,
      );
      extraTimeTransition = durationInFrames;
    } else if (containTransition && containTransition.type === "none") {
      extraTimeTransition = 2;
    }

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={
          durationInFrames + REMOTION_SAFE_FRAME + extraTimeTransition / 2
        }
        style={{ pointerEvents: "none" }}
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
      </TransitionSeries.Sequence>
    );
  },
  audio: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { details } = item as IAudio;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <AbsoluteFill>
          <Audio
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
            src={details.src}
            volume={()=>clamp(0, 100, details?.volume)}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  caption: (item, options: SequenceItemOptions) => {
    const { fps } = options;
    const { id, details } = item as ICaption;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const boxShadowAsShadow = details.boxShadow
      ? `${details.boxShadow.x}px ${details.boxShadow.y}px ${details.boxShadow.blur}px ${details.boxShadow.color}`
      : "";
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type} pointer-events-none`}
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
      </TransitionSeries.Sequence>
    );
  },
  element: (item: any, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`mvb id-${item.id} mvb-type-${item.type}`}
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
  helper: (item: any, options: SequenceItemOptions) => {
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    return (
      <TransitionSeries.Sequence
        key={item.id}
        className={`mvb id-${item.id} mvb-type-${item.type}`}
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
