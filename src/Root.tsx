import {Composition} from 'remotion';
import {RenderVideo} from './renderer';
import React from 'react';
import {calcMyCompMetadata} from './MyComp';
import {HEIGHT, WIDTH, FPS} from './initVideo';
import {design} from './sample';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MoonShine"
				component={RenderVideo}
				durationInFrames={300}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
					design,
					size: {
						width:	WIDTH,
						height:	HEIGHT
					},
				}}
				calculateMetadata={calcMyCompMetadata}
			/>
		</>
	);
};
