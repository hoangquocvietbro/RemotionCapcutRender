import { Composition } from "remotion";
import { IDesign } from "@designcombo/types";
import { Composition as CoreComposition } from "./composition";
import basicTextO1 from "./data/example.json";

import {HEIGHT, WIDTH, FPS, calcMetadata} from './utils/calc-metadata';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
				id="RenderVideo"
				component={CoreComposition}
				durationInFrames={300}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{
          design: basicTextO1 as unknown as IDesign,
					size: {
						width: WIDTH,
						height: HEIGHT
					}
        }}
				calculateMetadata={calcMetadata}
			/>
    </>
  );
};
