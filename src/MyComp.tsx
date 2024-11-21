import axios from 'axios';
import {CalculateMetadataFunction} from 'remotion';

import { ISize, IDesign } from "@designcombo/types";

import { FPS } from './initVideo';

type metadataProps = {
	design: IDesign;
	size: ISize;
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (err: any) {
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
