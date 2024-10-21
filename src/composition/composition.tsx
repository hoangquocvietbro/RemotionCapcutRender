import {
  IDesign,
  ISize,
  IText,
  ITrackItem,
  ITrackItemAndDetails,
  ITransition,
} from "@designcombo/types";
import { useCallback, useEffect, useState } from "react";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useVideoConfig,
} from "remotion";
import { IFont } from "../types";
import { groupTrackItems } from "../utils/group-items";
import { SequenceItem } from "./sequence-item";
import { TransitionSeries } from "@remotion/transitions";
import { populateTransitionIds } from "../utils/frames";
import { TransitionSequenceItem } from "./sequence-item-transition";
import { Transitions } from "./transitions";

export const Composition = ({ design, size }: { design: IDesign, size: ISize }) => {
  const [groupedItems, setGroupedItems] = useState<string[][]>([]);
  const [handle] = useState(() => delayRender());
  const { fps } = useVideoConfig();

  const fetchData = useCallback(async () => {
    const fonts: IFont[] = [];
    const trackItemsMap = design.trackItemsMap as Record<
      string,
      ITrackItemAndDetails
    >;
    for (const key in trackItemsMap) {
      const trackItem = trackItemsMap[key] as IText;
      if (trackItem.type === "text" || trackItem.type === "caption") {
        fonts.push({
          postScriptName: trackItem.details.fontFamily,
          url: trackItem.details.fontUrl,
        });
      }
    }

    if (fonts.length > 0) {
      const fontPromises = fonts.map((f) =>
        loadFont({
          family: f.postScriptName,
          url: f.url,
        }),
      );
      await Promise.all(fontPromises);
    }

    continueRender(handle);
  }, []);

  useEffect(() => {
    fetchData();
    setGroupedItems(
      groupTrackItems({
        trackItemIds: design.trackItemIds,
        transitionsMap: design.transitionsMap,
      }),
    );
  }, []);

  return (
    <>
      <AbsoluteFill
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: "#000000",
        }}
       />
      {groupedItems.map((group, index) => {
        if (group.length === 1) {
          const item: ITrackItem = design.trackItemsMap[group[0]];
          return SequenceItem[item.type](item, { fps });
        }
        const firstTrackItem = design.trackItemsMap[group[0]];
        const from = (firstTrackItem.display.from / 1000) * fps;
        return (
          <TransitionSeries key={index} from={from}>
            {populateTransitionIds(group).map((id, index) => {
              // If index is pair, render transition, otherwise render sequence
              if (index % 2 === 0) {
                const item: ITrackItem = design.trackItemsMap[id];
                return TransitionSequenceItem[item.type](item, {
                  fps,
                });
              }

              const transition: ITransition = design.transitionsMap[id];
              return Transitions[transition.type]({
                durationInFrames: fps,
                height: size.height,
                width: size.width,
                id,
                direction: transition.direction,
              });
            })}
          </TransitionSeries>
        );
      })}
    </>
  );
};
