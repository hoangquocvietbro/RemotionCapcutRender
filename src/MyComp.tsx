import {CalculateMetadataFunction} from 'remotion';
import axios from 'axios'

import {Size, Design} from './core/types';

export const FPS = 30;
export const WIDTH = 1200;
export const HEIGHT = 1200;

type metadataProps = {
	design: Design;
	size: Size;
};

export const calcMyCompMetadata: CalculateMetadataFunction<
	metadataProps
> = async ({props}) => {
	const { design } = props;
	const fps = design.fps ? design.fps : FPS

	for (const key of Object.keys(design.trackItemsMap)) {
		if (design?.trackItemsMap[key]?.details?.src && design?.trackItemsMap[key]?.type === 'image') {
			try {
				await axios.get(design.trackItemsMap[key].details.src)
			} catch (error) {
				design.trackItemsMap[key].details.src = "https://remotion-images-video.s3.amazonaws.com/not_found.jpg"
			}
		}
	}

	return {
		fps,
		durationInFrames: design.duration ? Math.floor((design.duration/1000) * fps) : undefined,
		width: design.size.width,
		height: design.size.height,
		props: {
			...props,
			size: design.size
		},
	};
};
