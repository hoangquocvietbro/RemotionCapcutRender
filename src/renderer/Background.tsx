import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {Size} from '../core/types';

type Props = {
	layer?: any;
	size: Size;
	children: React.ReactNode;
};

export const Background: React.FC<Props> = ({layer, children, size}) => {
	// Let background = (<AbsoluteFill style={{backgroundColor:"black"}}>{children}</AbsoluteFill>);
	let background = (
		<AbsoluteFill style={{width: size.width, height: size.height}}>
			{children}
		</AbsoluteFill>
	);

	if (layer?.src) {
		background = (
			<AbsoluteFill>
				<AbsoluteFill style={{width: size.width, height: size.height}}>
					<Img
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: layer.width,
							height: layer.height,
						}}
						src={layer.src}
					/>
				</AbsoluteFill>
				<AbsoluteFill>{children}</AbsoluteFill>
			</AbsoluteFill>
		);
	}

	return background;
};
