import {Composition} from 'remotion';
import {MoonShine} from './renderer/MoonShine';
import React from 'react';
import {HEIGHT, WIDTH, FPS, calcMyCompMetadata} from './MyComp';
import {design} from './sample';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MoonShine"
				component={MoonShine}
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
