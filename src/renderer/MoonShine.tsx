import {Size, Design, ITrackItem, ITransition} from '../core/types';
import {Background} from './Background';
import {useCallback, useEffect, useState} from 'react';
import {IFont} from './fonts';
import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, useVideoConfig, useCurrentFrame} from 'remotion';
import {groupTrackItems} from '../core/track-items';
import {SequenceItem} from './sequence-item';
import {TransitionSeries} from '@remotion/transitions';
import {populateTransitionIds} from '../core/scene';
import {TransitionSequenceItem} from './transition-sequence-item';
import {Transitions} from './transitions';
import { createTimeline } from '../lib/anime/anime';

export const MoonShine = ({design, size}: {design: Design; size: Size}) => {
	const [groupedItems, setGroupedItems] = useState<string[][]>([]);
	const [timeLine] = useState(createTimeline({
		loop: false,
		autoplay: false,
	}));

	const [handle] = useState(() => delayRender());
	const {fps} = useVideoConfig();
	const currentFrame = useCurrentFrame()

	const fetchData = useCallback(async () => {
		const fonts: IFont[] = [];

		for (const layer of Object.values(design.trackItemsMap)) {
			if (layer.details.fontUrl && layer.details.fontFamily) {
				fonts.push({
					postScriptName: layer.details.fontFamily,
					url: layer.details.fontUrl,
				});
			}
		}

		if (fonts.length > 0) {
			for (const f of fonts) {
				await loadFont({
					family: f.postScriptName,
					url: f.url,
				});
			}
		}
		continueRender(handle);
	}, []);

	useEffect(() => {
		fetchData();
		setGroupedItems(
			groupTrackItems({
				trackItemIds: design.trackItemIds,
				transitionsMap: design.transitionsMap,
			})
		);
	}, []);

	useEffect(() => {
		timeLine.seek((currentFrame / fps) * 1000, true);
  }, [currentFrame, timeLine, fps]);

	return (
		<Background layer={undefined} size={size}>
			{groupedItems.map((group, index) => {
        if (group.length === 1) {
          const item: ITrackItem = design.trackItemsMap[group[0]];
          return SequenceItem[item.type](item, { fps, timeLine })
				}
        const firstTrackItem = design.trackItemsMap[group[0]];
        const from = (firstTrackItem.display.from / 1000) * fps;
        return (
          <TransitionSeries key={index} from={from}>
            {populateTransitionIds(group).map((id, index) => {
              // If index is pair, render transition, otherwise render sequence
              if (index % 2 === 0) {
                const item: ITrackItem = design.trackItemsMap[id];
                return TransitionSequenceItem[item.type](item, { fps, timeLine });
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
		</Background>
	);
};
