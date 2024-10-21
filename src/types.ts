import { IDesign } from "@designcombo/types";

export type MetadataProps = {
  design: IDesign;
  size: {
    width: number;
    height: number;
  };
};

export interface IFont {
  postScriptName: string;
  url: string;
}
