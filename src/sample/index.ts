import { Design } from "../core/types";

export const design: Design = {
  trackItemIds: [],
  trackItemsMap: {},
  transitionIds: [],
  transitionsMap: {},
  tracks: [
    {
      id: "main",
      type: "main",
      items: [],
      accepts: ["video", "image"],
    },
  ],
  size: {
    width: 1920,
    height: 1080,
  },
  duration: 4470,
  fps: 30,
  projectId: "main",
};
