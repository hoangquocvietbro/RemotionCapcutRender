import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Audio, Img, OffthreadVideo } from "remotion";
import {
  IAudio,
  IImage,
  IText,
  ITrackItem,
  IVideo,
  ItemType,
} from "@designcombo/types";
import MainLayerBackground from "./main-layer-background";
import { calculateFrames } from "../utils/frames";

interface SequenceItemOptions {
  fps: number;
}

export const TransitionSequenceItem: Record<
  ItemType,
  (trackItem: ITrackItem, options: SequenceItemOptions) => JSX.Element
> = {
  text: (trackItem, options) => {
    const item = trackItem as IText;
    const details = item.details;
    const { fps } = options;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const boxShadowAsShadow = item.details.boxShadow
      ? `${item.details.boxShadow.x}px ${item.details.boxShadow.y}px ${item.details.boxShadow.blur}px ${item.details.boxShadow.color}`
      : "";
    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames}
        style={{
          width: details.width || 300,
          height: details.height || 400,
          transform: item.details.transform || "none",
          fontSize: details.fontSize || "16px", // Updated default font size
          textAlign: details.textAlign || "left", // Updated default text alignment
          top: details.top || 300,
          left: details.left || 600,
          color: details.color || "#000000", // Updated text color (fill)
          backgroundColor: details.backgroundColor || "transparent", // Updated background color
          border: details.border || "none", // Updated border
          textShadow: details.textShadow || "none", // Updated text shadow
          opacity: details.opacity ? item.details.opacity / 100 : undefined,
          fontFamily: details.fontFamily || "Arial", // Updated default font family
          textDecoration: details.textDecoration || "none",
          fontWeight: details.fontWeight || "normal",
          lineHeight: details.lineHeight || "normal", // Added line height
          letterSpacing: details.letterSpacing || "normal", // Added letter spacing
          wordSpacing: details.wordSpacing || "normal", // Added word spacing
        }}
      >
        <AbsoluteFill
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        >
          <div
            style={{
              pointerEvents: "none",
              width: "100%",
              whiteSpace: "normal",
              position: "relative",
              textDecoration: details.textDecoration || "none",
              WebkitTextStroke: `${item.details.borderWidth}px ${item.details.borderColor}`, // Outline/stroke color and thickness
              paintOrder: "stroke fill", // Order of painting
              textShadow: boxShadowAsShadow,
            }}
          >
            {details.text}
          </div>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  image: (trackItem, options) => {
    const item = trackItem as IImage;
    const { fps } = options;
    const { details } = item;

    const { durationInFrames } = calculateFrames(item.display, fps);
    const crop = item.details?.crop || {
      x: 0,
      y: 0,
      width: item.details.width,
      height: item.details.height,
    };
    const boxShadowAsOutline = `0 0 0 ${item.details.borderWidth}px ${item.details.borderColor}`;
    const boxShadowAsShadow = item.details.boxShadow
      ? `${item.details.boxShadow.x}px ${item.details.boxShadow.y}px ${item.details.boxShadow.blur}px ${item.details.boxShadow.color}`
      : "";

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames}
        style={{
          pointerEvents: "auto",
        }}
      >
        {item.isMain && (
          <MainLayerBackground
            key={item.id + "background"}
            background={item.details.background}
          />
        )}
        <AbsoluteFill
          data-track-item="transition-element"
          style={{
            pointerEvents: "auto",
            top: details?.top || 0,
            left: details?.left || 0,
            width: crop.width || "100%", // Default width
            height: crop.height || "auto", // Default height
            transform: item.details?.transform || "none",
            border: details?.border || "none", // Default border
            opacity:
              details?.opacity !== undefined ? item.details.opacity / 100 : 1,
            borderRadius: `${Math.min(crop.width, crop.height) * ((item.details.borderRadius || 0) / 100)}px`, // Default border radius
            boxShadow:
              boxShadowAsOutline +
              (boxShadowAsShadow ? ", " + boxShadowAsShadow : ""), // Default box shadow
            overflow: "hidden",
            transformOrigin: details?.transformOrigin || "center center",
          }}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        >
          <div
            style={{
              width: item.details.width || "100%", // Default width
              height: item.details.height || "auto", // Default height
              position: "relative",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <Img
              style={{
                pointerEvents: "none",
                top: -crop.y || 0,
                left: -crop.x || 0,
                width: item.details.width || "100%", // Default width
                height: item.details.height || "auto", // Default height
                position: "absolute",
              }}
              data-id={item.id}
              src={item.details.src}
            />
          </div>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  video: (trackItem, options) => {
    const item = trackItem as IVideo;
    const playbackRate = item.playbackRate || 1;
    const { fps } = options;
    const { details } = item;
    const { durationInFrames } = calculateFrames(
      {
        from: item.display.from / playbackRate,
        to: item.display.to / playbackRate,
      },
      fps,
    );
    const trim = {
      from: (item.trim?.from || item.display.from) / playbackRate,
      to: (item.trim?.to || item.display.to) / playbackRate,
    };
    const boxShadowAsOutline = `0 0 0 ${item.details.borderWidth}px ${item.details.borderColor}`;
    const boxShadowAsShadow = item.details.boxShadow
      ? `${item.details.boxShadow.x}px ${item.details.boxShadow.y}px ${item.details.boxShadow.blur}px ${item.details.boxShadow.color}`
      : "";
    const crop = item.details?.crop || {
      x: 0,
      y: 0,
      width: item.details.width,
      height: item.details.height,
    };

    return (
      <TransitionSeries.Sequence
        key={item.id}
        durationInFrames={durationInFrames}
        style={{
          pointerEvents: "none",
        }}
      >
        {item.isMain && (
          <MainLayerBackground
            key={item.id + "background"}
            background={item.details.background!}
          />
        )}
        <AbsoluteFill
          data-track-item="transition-element"
          style={{
            pointerEvents: "auto",
            top: item?.details?.top || 0,
            left: item?.details?.left || 0,
            width: crop.width || "100%", // Default width
            height: crop.height || "auto", // Default height
            transform: item.details?.transform || "none",
            opacity:
              item?.details?.opacity !== undefined
                ? item.details.opacity / 100
                : 1,
            borderRadius: `${Math.min(crop.width!, crop.height!) * ((item.details.borderRadius || 0) / 100)}px`, // Default border radius
            boxShadow:
              boxShadowAsOutline +
              (boxShadowAsShadow ? ", " + boxShadowAsShadow : ""), // Default box shadow
            overflow: "hidden",
            transformOrigin: details.transformOrigin || "center center",
            filter: `brightness(${details.brightness}%) blur(${details.blur}px)`,
          }}
          className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        >
          <div
            style={{
              width: item.details.width || "100%", // Default width
              height: item.details.height || "auto", // Default height
              position: "relative",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <OffthreadVideo
              startFrom={(trim.from / 1000) * fps}
              endAt={(trim.to / 1000) * fps}
              src={item.details.src}
              volume={details.volume! / 100}
              playbackRate={playbackRate}
              style={{
                pointerEvents: "none",
                top: -crop.y || 0,
                left: -crop.x || 0,
                width: item.details.width || "100%", // Default width
                height: item.details.height || "auto", // Default height
                position: "absolute",
              }}
            />
          </div>
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  audio: (trackItems, options) => {
    const item = trackItems as IAudio;
    const { fps } = options;

    const playbackRate = item.playbackRate || 1;
    const { durationInFrames } = calculateFrames(
      {
        from: item.display.from / playbackRate,
        to: item.display.to / playbackRate,
      },
      fps,
    );
    const trim = {
      from: (item.trim?.from || item.display.from) / playbackRate,
      to: (item.trim?.to || item.display.to) / playbackRate,
    };
    return (
      <TransitionSeries.Sequence
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        key={item.id}
        durationInFrames={durationInFrames}
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <AbsoluteFill>
          <Audio
            playbackRate={playbackRate}
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps}
            src={item.details.src}
            volume={item.details.volume! / 100}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
  caption: () => <></>,
  helper: () => <></>,
};
