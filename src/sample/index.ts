import { Design } from "../core/types";

export const design: Design = {
  trackItemIds: [
    "WKOPSU1tCuiV-HkfrhuST",
    "TqLJKsDMlSVt8XnvIzWwh",
    "HpmO-4nAPMlMnn2INDzk1",
  ],
  trackItemsMap: {
    "HpmO-4nAPMlMnn2INDzk1": {
      id: "HpmO-4nAPMlMnn2INDzk1",
      type: "image",
      name: "",
      display: {
        from: 1100,
        to: 3000,
      },
      details: {
        src: "https://vpm1.s3.eu-north-1.amazonaws.com/did:privy:clsc8b1tq04jck48jklah7n08/image-1725215620078.jpg",
        preview: "",
        width: 1024,
        height: 1024,
        opacity: 100,
        transform: "scale(0.360704, 0.360704)",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        top: "-192.32px",
        left: "1087.36px",
      },
      metadata: {},
      isMain: false,
    },
    TqLJKsDMlSVt8XnvIzWwh: {
      id: "TqLJKsDMlSVt8XnvIzWwh",
      name: "",
      type: "video",
      display: {
        from: 0,
        to: 4041.6670000000013,
      },
      trim: {
        from: 0,
        to: 4041.6670000000004,
      },
      details: {
        src: "https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/fc4bhtmbxvx1tp4q/768p0.mp4",
        preview: "",
        width: 768,
        height: 768,
        duration: 4041.6670000000004,
        opacity: 100,
        volume: 100,
        transform: "scale(1.40625)",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        top: "156px",
        left: "576px",
      },
      metadata: {
        resourceId:
          "https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/fc4bhtmbxvx1tp4q/768p0.mp4",
      },
      isMain: true,
    },
    "WKOPSU1tCuiV-HkfrhuST": {
      id: "WKOPSU1tCuiV-HkfrhuST",
      name: "",
      type: "video",
      display: {
        from: 4041.6670000000013,
        to: 8083.334000000003,
      },
      trim: {
        from: 0,
        to: 4041.6670000000004,
      },
      details: {
        src: "https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/429f2ui2opsvap5t/768p0.mp4",
        preview: "",
        width: 768,
        height: 768,
        duration: 4041.6670000000004,
        opacity: 100,
        volume: 100,
        transform: "scale(1.40625)",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        top: "156px",
        left: "576px",
      },
      metadata: {
        resourceId:
          "https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/429f2ui2opsvap5t/768p0.mp4",
      },
      isMain: true,
    },
  },
  transitionIds: ["TqLJKsDMlSVt8XnvIzWwh-WKOPSU1tCuiV-HkfrhuST"],
  transitionsMap: {
    "TqLJKsDMlSVt8XnvIzWwh-WKOPSU1tCuiV-HkfrhuST": {
      id: "TqLJKsDMlSVt8XnvIzWwh-WKOPSU1tCuiV-HkfrhuST",
      duration: 2000,
      fromId: "TqLJKsDMlSVt8XnvIzWwh",
      toId: "WKOPSU1tCuiV-HkfrhuST",
      type: "fade",
      trackId: "main",
    },
  },
  tracks: [
    {
      id: "AhJcR4x3uRQglp9mkcsR4",
      items: ["HpmO-4nAPMlMnn2INDzk1"],
      type: "image",
      accepts: ["image", "video"],
    },
    {
      id: "main",
      type: "main",
      items: ["TqLJKsDMlSVt8XnvIzWwh", "WKOPSU1tCuiV-HkfrhuST"],
      accepts: ["video", "image"],
    },
  ],
  size: {
    width: 1920,
    height: 1080,
    name: "16:9",
  },
  duration: 8083.334000000003,
  fps: 30,
  projectId: "main",
};
